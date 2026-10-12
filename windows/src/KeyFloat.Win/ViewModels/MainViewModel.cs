using System.Collections.ObjectModel;
using System.Windows.Input;
using KeyFloat.Core.Models;
using KeyFloat.Core.Services;
using KeyFloat.Win.Services;

namespace KeyFloat.Win.ViewModels;

public sealed class MainViewModel : ObservableObject
{
    private readonly ShortcutRepository _repository;
    private readonly SettingsService _settings;
    private readonly SubmissionService _submissions;
    private readonly Dictionary<string, string> _softwareIdByExecutable;
    private SoftwarePack _selectedSoftware;
    private AppLanguage _language;
    private AppTheme _theme;
    private string _selectedCategoryId = "all";
    private string _query = "";
    private string _softwarePickerQuery = "";
    private bool _favoriteOnly;
    private bool _isPinned;
    private bool _isExpanded;
    private bool _isSoftwareSearchActive;
    private IReadOnlyList<ShortcutSectionViewModel> _filteredSections = [];
    private IReadOnlyList<CategoryViewModel> _categories = [];
    private IReadOnlyList<PickerSectionViewModel> _pickerSections = [];

    public MainViewModel(ShortcutRepository repository, SettingsService settings, SubmissionService submissions)
    {
        _repository = repository;
        _settings = settings;
        _submissions = submissions;
        _language = settings.Current.Language;
        _theme = settings.Current.Theme;
        _isPinned = settings.Current.IsPinned;
        _selectedSoftware = repository.FindSoftware(settings.Current.SelectedSoftwareId) is { IsAvailableOnWindows: true } saved
            ? saved
            : repository.FindSoftware("figma") ?? repository.Software.First(pack => pack.IsAvailableOnWindows);
        _softwareIdByExecutable = repository.Software
            .Where(pack => pack.IsAvailableOnWindows)
            .SelectMany(pack => pack.WindowsExecutableNames.Select(name => (Name: NormalizeExecutable(name), pack.Id)))
            .GroupBy(entry => entry.Name, StringComparer.OrdinalIgnoreCase)
            .ToDictionary(group => group.Key, group => group.First().Id, StringComparer.OrdinalIgnoreCase);

        ToggleLanguageCommand = new RelayCommand(_ => ToggleLanguage());
        ToggleThemeCommand = new RelayCommand(_ => ToggleTheme());
        TogglePinCommand = new RelayCommand(_ => TogglePin());
        ToggleExpansionCommand = new RelayCommand(_ => ExpansionRequested?.Invoke(!_isExpanded));
        CloseCommand = new RelayCommand(_ => CloseRequested?.Invoke(this, EventArgs.Empty));
        SelectCategoryCommand = new RelayCommand(parameter => SelectCategory((string?)parameter ?? "all"));
        SelectSoftwareCommand = new RelayCommand(parameter => SelectSoftware(parameter as SoftwarePack));
        ToggleFavoriteCommand = new RelayCommand(parameter => ToggleFavorite(parameter as ShortcutRowViewModel));
        SetFavoriteFilterCommand = new RelayCommand(parameter => FavoriteOnly = bool.TryParse(parameter?.ToString(), out var value) && value);
        PickerEntryCommand = new RelayCommand(parameter => ActivatePickerEntry(parameter as PickerEntryViewModel));
        ActivateSoftwareSearchCommand = new RelayCommand(_ =>
        {
            IsSoftwareSearchActive = true;
            SoftwareSearchFocusRequested?.Invoke();
        });
        ClearSoftwareSearchCommand = new RelayCommand(_ => SoftwarePickerQuery = "");
        OpenFeedbackCommand = new RelayCommand(_ => FeedbackRequested?.Invoke(this, EventArgs.Empty));

        RebuildLocalizedState();
        ThemeService.Apply(_theme);
    }

    public event Action<bool>? ExpansionRequested;
    public event EventHandler? CloseRequested;
    public event EventHandler? SoftwareSelected;
    public event Action<string>? SoftwareRequestRequested;
    public event EventHandler? FeedbackRequested;
    public event EventHandler? ThemeChanged;
    public event EventHandler? PinChanged;
    public event Action? SoftwareSearchFocusRequested;

    public ICommand ToggleLanguageCommand { get; }
    public ICommand ToggleThemeCommand { get; }
    public ICommand TogglePinCommand { get; }
    public ICommand ToggleExpansionCommand { get; }
    public ICommand CloseCommand { get; }
    public ICommand SelectCategoryCommand { get; }
    public ICommand SelectSoftwareCommand { get; }
    public ICommand ToggleFavoriteCommand { get; }
    public ICommand SetFavoriteFilterCommand { get; }
    public ICommand PickerEntryCommand { get; }
    public ICommand ActivateSoftwareSearchCommand { get; }
    public ICommand ClearSoftwareSearchCommand { get; }
    public ICommand OpenFeedbackCommand { get; }

    public SoftwarePack SelectedSoftware => _selectedSoftware;
    public AppLanguage Language => _language;
    public AppTheme Theme => _theme;
    public bool IsChinese => _language == AppLanguage.Chinese;
    public bool IsEnglish => _language == AppLanguage.English;

    public bool IsPinned
    {
        get => _isPinned;
        private set
        {
            if (!SetProperty(ref _isPinned, value)) return;
            OnPropertyChanged(nameof(PinGlyph));
            OnPropertyChanged(nameof(PinToolTip));
        }
    }

    public bool IsExpanded
    {
        get => _isExpanded;
        private set
        {
            if (!SetProperty(ref _isExpanded, value)) return;
            OnPropertyChanged(nameof(ExpansionGlyph));
            OnPropertyChanged(nameof(ExpansionToolTip));
        }
    }

    public string Query
    {
        get => _query;
        set
        {
            if (!SetProperty(ref _query, value)) return;
            RebuildFilteredSections();
        }
    }

    public string SoftwarePickerQuery
    {
        get => _softwarePickerQuery;
        set
        {
            if (!SetProperty(ref _softwarePickerQuery, value)) return;
            RebuildPickerSections();
            OnPropertyChanged(nameof(HasSoftwarePickerQuery));
        }
    }

    public bool HasSoftwarePickerQuery => !string.IsNullOrWhiteSpace(_softwarePickerQuery);

    public bool IsSoftwareSearchActive
    {
        get => _isSoftwareSearchActive;
        set => SetProperty(ref _isSoftwareSearchActive, value);
    }

    public bool FavoriteOnly
    {
        get => _favoriteOnly;
        set
        {
            if (!SetProperty(ref _favoriteOnly, value)) return;
            OnPropertyChanged(nameof(AllFilterActive));
            OnPropertyChanged(nameof(FavoriteFilterActive));
            RebuildFilteredSections();
        }
    }

    public bool AllFilterActive => !FavoriteOnly;
    public bool FavoriteFilterActive => FavoriteOnly;
    public IReadOnlyList<ShortcutSectionViewModel> FilteredSections => _filteredSections;
    public IReadOnlyList<CategoryViewModel> Categories => _categories;
    public IReadOnlyList<PickerSectionViewModel> PickerSections => _pickerSections;
    public int ShownCount => _filteredSections.Sum(section => section.Items.Count);
    public string ShownCountText => IsChinese ? $"{ShownCount} 项" : $"{ShownCount} items";
    public string ResultTitle => !string.IsNullOrWhiteSpace(Query)
        ? (IsChinese ? $"搜索结果 · “{Query}”" : $"Search results · “{Query}”")
        : FavoriteOnly
            ? (IsChinese ? "已收藏快捷键" : "Favorite shortcuts")
            : _selectedCategoryId == "all"
                ? (IsChinese ? "全部快捷键" : "All shortcuts")
                : _selectedSoftware.Categories.FirstOrDefault(category => category.Id == _selectedCategoryId)?.Title(_language) ?? "";
    public string CompanionText => IsChinese ? "快捷键助手" : "Shortcut companion";
    public string LibraryText => IsChinese ? "快捷键库" : "Shortcut library";
    public string SearchPlaceholder => IsChinese ? "搜索命令、工具或按键" : "Search commands, tools or keys";
    public string AllText => IsChinese ? "全部" : "All";
    public string FavoritesText => IsChinese ? "收藏" : "Favorites";
    public string PlatformText => IsChinese ? "仅 Windows" : "Windows only";
    public string CollapseText => IsChinese ? "收起" : "collapse";
    public string SearchText => IsChinese ? "搜索" : "search";
    public string FeedbackText => IsChinese ? "问题反馈" : "Feedback";
    public string ChooseSoftwareText => IsChinese ? "选择软件" : "Choose software";
    public string SwitchLibraryText => IsChinese ? "切换当前快捷键库" : "Switch the shortcut library";
    public string SoftwareSearchPlaceholder => IsChinese ? "搜索软件名称" : "Search software";
    public string PickerFooterText => IsChinese
        ? "快捷键库已按办公、设计、工程、开发与媒体等场景分类。"
        : "Shortcut packs are grouped by office, design, engineering, development, media, and more.";
    public string LanguageButtonText => IsChinese ? "中" : "EN";
    public string ThemeGlyph => Theme == AppTheme.Dark ? "\uE706" : "\uE708";
    public string ThemeToolTip => IsChinese
        ? (Theme == AppTheme.Dark ? "切换到浅色模式" : "切换到深色模式")
        : (Theme == AppTheme.Dark ? "Switch to light mode" : "Switch to dark mode");
    public string PinGlyph => IsPinned ? "\uE718" : "\uE77A";
    public string PinToolTip => IsChinese ? (IsPinned ? "取消钉住窗口" : "钉住窗口") : (IsPinned ? "Unpin window" : "Pin window");
    public string ExpansionGlyph => IsExpanded ? "\uE70E" : "\uE70D";
    public string ExpansionToolTip => IsChinese ? (IsExpanded ? "收起快捷键面板" : "展开快捷键面板") : (IsExpanded ? "Collapse shortcut panel" : "Expand shortcut panel");
    public string CloseToolTip => IsChinese ? "关闭窗口" : "Close window";
    public string EmptyTitle => FavoriteOnly
        ? (IsChinese ? "还没有收藏快捷键" : "No favorite shortcuts yet")
        : (IsChinese ? "没有找到快捷键" : "No shortcuts found");
    public string EmptyMessage => FavoriteOnly
        ? (IsChinese ? "点击星标收藏常用命令。" : "Use the star to keep common commands here.")
        : (IsChinese ? "试试搜索中文、英文或具体按键。" : "Try a command, tool, or key.");

    public void SetExpanded(bool expanded) => IsExpanded = expanded;

    public void SetLanguage(AppLanguage language)
    {
        if (_language == language) return;
        _language = language;
        _settings.Current.Language = language;
        _settings.Save();
        RebuildLocalizedState();
    }

    public void DismissSoftwareSearch() => IsSoftwareSearchActive = false;

    public void ResetSoftwarePicker()
    {
        SoftwarePickerQuery = "";
        IsSoftwareSearchActive = false;
    }

    public void SelectForegroundProcess(string processName)
    {
        if (IsExpanded || string.IsNullOrWhiteSpace(processName)) return;
        if (_softwareIdByExecutable.TryGetValue(NormalizeExecutable(processName), out var softwareId))
        {
            SelectSoftware(_repository.FindSoftware(softwareId), notify: false);
        }
    }

    public void SaveSoftwareRequest(string group, string name, string contact)
    {
        _submissions.Save("software-request", name, contact, group, IsChinese ? "zh" : "en");
    }

    public void SaveFeedback(string message, string contact)
    {
        _submissions.Save("feedback", message, contact, _selectedSoftware.Id, IsChinese ? "zh" : "en");
    }

    private void ToggleLanguage()
    {
        SetLanguage(IsChinese ? AppLanguage.English : AppLanguage.Chinese);
    }

    private void ToggleTheme()
    {
        _theme = Theme == AppTheme.Dark ? AppTheme.Light : AppTheme.Dark;
        _settings.Current.Theme = _theme;
        _settings.Save();
        ThemeService.Apply(_theme);
        OnPropertyChanged(nameof(Theme));
        OnPropertyChanged(nameof(ThemeGlyph));
        OnPropertyChanged(nameof(ThemeToolTip));
        ThemeChanged?.Invoke(this, EventArgs.Empty);
    }

    private void TogglePin()
    {
        IsPinned = !IsPinned;
        _settings.Current.IsPinned = IsPinned;
        _settings.Save();
        PinChanged?.Invoke(this, EventArgs.Empty);
    }

    private void SelectCategory(string id)
    {
        if (id != "all" && !_selectedSoftware.Categories.Any(category => category.Id == id)) id = "all";
        _selectedCategoryId = id;
        RebuildCategories();
        RebuildFilteredSections();
    }

    private void SelectSoftware(SoftwarePack? software, bool notify = true)
    {
        if (software is null || !software.IsAvailableOnWindows || software.Id == _selectedSoftware.Id) return;
        _selectedSoftware = software;
        _selectedCategoryId = "all";
        _query = "";
        _favoriteOnly = false;
        _settings.Current.SelectedSoftwareId = software.Id;
        _settings.Save();
        OnPropertyChanged(nameof(SelectedSoftware));
        OnPropertyChanged(nameof(Query));
        OnPropertyChanged(nameof(FavoriteOnly));
        OnPropertyChanged(nameof(AllFilterActive));
        OnPropertyChanged(nameof(FavoriteFilterActive));
        RebuildCategories();
        RebuildFilteredSections();
        if (notify) SoftwareSelected?.Invoke(this, EventArgs.Empty);
    }

    private void ToggleFavorite(ShortcutRowViewModel? row)
    {
        if (row is null) return;
        var key = ShortcutRepository.FavoriteKey(_selectedSoftware.Id, row.Item.Id);
        if (!_settings.Current.Favorites.Add(key)) _settings.Current.Favorites.Remove(key);
        _settings.Save();
        RebuildFilteredSections();
    }

    private void ActivatePickerEntry(PickerEntryViewModel? entry)
    {
        if (entry is null) return;
        if (entry.IsAdd)
        {
            SoftwareRequestRequested?.Invoke(entry.Group);
        }
        else if (entry.Software is { IsAvailableOnWindows: true } software)
        {
            SelectSoftware(software);
        }
    }

    private void RebuildLocalizedState()
    {
        foreach (var property in new[]
        {
            nameof(Language), nameof(IsChinese), nameof(IsEnglish), nameof(CompanionText), nameof(LibraryText),
            nameof(SearchPlaceholder), nameof(AllText), nameof(FavoritesText), nameof(PlatformText), nameof(CollapseText),
            nameof(SearchText), nameof(FeedbackText), nameof(ChooseSoftwareText), nameof(SwitchLibraryText),
            nameof(SoftwareSearchPlaceholder), nameof(LanguageButtonText), nameof(ThemeToolTip), nameof(PinToolTip),
            nameof(ExpansionToolTip), nameof(CloseToolTip), nameof(EmptyTitle), nameof(EmptyMessage), nameof(PickerFooterText),
        }) OnPropertyChanged(property);
        RebuildCategories();
        RebuildPickerSections();
        RebuildFilteredSections();
    }

    private void RebuildCategories()
    {
        var all = new CategoryViewModel("all", IsChinese ? "全部分类" : "All categories", _selectedCategoryId == "all");
        _categories = [all, .. _selectedSoftware.Categories.Select(category =>
            new CategoryViewModel(category.Id, category.Title(_language), category.Id == _selectedCategoryId))];
        OnPropertyChanged(nameof(Categories));
    }

    private void RebuildFilteredSections()
    {
        _filteredSections = _repository.Filter(
            _selectedSoftware,
            _selectedCategoryId,
            Query,
            FavoriteOnly,
            _settings.Current.Favorites)
            .Select(section => new ShortcutSectionViewModel(
                section.Category.Title(_language).ToUpperInvariant(),
                section.Items.Select(item => new ShortcutRowViewModel(
                    item,
                    item.Title(_language),
                    item.Keys(_language),
                    _settings.Current.Favorites.Contains(ShortcutRepository.FavoriteKey(_selectedSoftware.Id, item.Id))))
                .ToArray()))
            .ToArray();
        OnPropertyChanged(nameof(FilteredSections));
        OnPropertyChanged(nameof(ShownCount));
        OnPropertyChanged(nameof(ShownCountText));
        OnPropertyChanged(nameof(ResultTitle));
        OnPropertyChanged(nameof(EmptyTitle));
        OnPropertyChanged(nameof(EmptyMessage));
    }

    private void RebuildPickerSections()
    {
        var query = ShortcutRepository.Normalize(_softwarePickerQuery);
        var queryTokens = query.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        _pickerSections = _repository.GroupedSoftware
            .Select(section =>
            {
                var matching = section.Software.Where(software =>
                {
                    if (queryTokens.Length == 0) return true;
                    var haystack = ShortcutRepository.Normalize($"{software.Name} {software.Id}");
                    return queryTokens.All(token => haystack.Contains(token, StringComparison.Ordinal));
                });
                var entries = matching.Select(software => PickerEntryViewModel.ForSoftware(
                    software,
                    software.IsAvailableOnWindows
                        ? (IsChinese ? $"{software.ShortcutCount} 项" : $"{software.ShortcutCount} items")
                        : (IsChinese ? "仅苹果电脑可用" : "macOS only"))).ToList();
                if (query.Length == 0) entries.Add(PickerEntryViewModel.ForAdd(section.Group));
                return new PickerSectionViewModel(
                    GroupTitle(section.Group, _language),
                    section.Software.Count,
                    entries);
            })
            .Where(section => section.Entries.Count > 0)
            .ToArray();
        OnPropertyChanged(nameof(PickerSections));
    }

    private static string NormalizeExecutable(string value) => Path.GetFileNameWithoutExtension(value).Trim();

    public static string GroupTitle(string group, AppLanguage language)
    {
        var chinese = language == AppLanguage.Chinese;
        return group switch
        {
            "office" => chinese ? "办公软件" : "Office",
            "study" => chinese ? "学习与科研" : "Study & Research",
            "design" => chinese ? "设计创意" : "Design",
            "media" => chinese ? "媒体制作" : "Media",
            "architecture" => chinese ? "建筑设计" : "Architecture",
            "engineering" => chinese ? "工程制图" : "Engineering",
            "modeling" => chinese ? "三维与动画" : "3D & Animation",
            "simulation" => chinese ? "仿真与计算" : "Simulation",
            "development" => chinese ? "软件开发" : "Development",
            "versionControl" => chinese ? "版本控制与 DevOps" : "Version Control & DevOps",
            "databaseAPI" => chinese ? "数据库与 API" : "Database & API",
            "dataAI" => chinese ? "数据与智能" : "Data & AI",
            "electronics" => chinese ? "电子与电气" : "Electronics & Electrical",
            "biology" => chinese ? "生物科学" : "Biological Science",
            "chemistry" => chinese ? "化学与材料" : "Chemistry & Materials",
            "medical" => chinese ? "医学影像" : "Medical Imaging",
            "gameDevelopment" => chinese ? "游戏开发" : "Game Development",
            "collaboration" => chinese ? "协作与项目管理" : "Collaboration & Projects",
            "browser" => chinese ? "浏览器" : "Browsers",
            "windowsUtility" => chinese ? "Windows 效率工具" : "Windows Utilities",
            _ => chinese ? "浏览器与效率工具" : "Browsers & Productivity",
        };
    }
}

public sealed record CategoryViewModel(string Id, string Title, bool IsActive);

public sealed record ShortcutSectionViewModel(string Title, IReadOnlyList<ShortcutRowViewModel> Items);

public sealed record ShortcutRowViewModel(ShortcutItem Item, string Title, IReadOnlyList<string> Keys, bool IsFavorite)
{
    public string FavoriteGlyph => IsFavorite ? "\uE734" : "\uE735";
}

public sealed record PickerSectionViewModel(string Title, int Count, IReadOnlyList<PickerEntryViewModel> Entries);

public sealed class PickerEntryViewModel
{
    private PickerEntryViewModel(bool isAdd, string group, SoftwarePack? software, string subtitle)
    {
        IsAdd = isAdd;
        Group = group;
        Software = software;
        Subtitle = subtitle;
    }

    public bool IsAdd { get; }
    public bool IsSoftware => !IsAdd;
    public string Group { get; }
    public SoftwarePack? Software { get; }
    public string Subtitle { get; }
    public bool IsEnabled => IsAdd || Software?.IsAvailableOnWindows == true;

    public static PickerEntryViewModel ForSoftware(SoftwarePack software, string subtitle) => new(false, software.Group, software, subtitle);
    public static PickerEntryViewModel ForAdd(string group) => new(true, group, null, "");
}
