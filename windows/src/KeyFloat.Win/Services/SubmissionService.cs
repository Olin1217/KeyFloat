using System.Text.Json;

namespace KeyFloat.Win.Services;

public sealed record SubmissionRecord(
    Guid Id,
    string Type,
    string Message,
    string Contact,
    string Context,
    string Language,
    DateTimeOffset SubmittedAt);

public sealed class SubmissionService
{
    private readonly string _directory;
    private readonly string _path;

    public SubmissionService()
    {
        _directory = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "KeyFloat");
        _path = Path.Combine(_directory, "submissions.json");
    }

    public void Save(string type, string message, string contact, string context, string language)
    {
        var records = Load();
        records.Add(new SubmissionRecord(Guid.NewGuid(), type, message.Trim(), contact.Trim(), context, language, DateTimeOffset.UtcNow));
        if (records.Count > 100) records.RemoveRange(0, records.Count - 100);
        Directory.CreateDirectory(_directory);
        var temporary = _path + ".tmp";
        File.WriteAllText(temporary, JsonSerializer.Serialize(records, new JsonSerializerOptions { WriteIndented = true }));
        File.Move(temporary, _path, true);
    }

    private List<SubmissionRecord> Load()
    {
        try
        {
            return File.Exists(_path)
                ? JsonSerializer.Deserialize<List<SubmissionRecord>>(File.ReadAllText(_path)) ?? []
                : [];
        }
        catch (JsonException)
        {
            return [];
        }
        catch (IOException)
        {
            return [];
        }
    }
}
