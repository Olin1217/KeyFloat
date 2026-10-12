import AppKit
import Foundation

let arguments = CommandLine.arguments
guard arguments.count == 2 else {
    fputs("Usage: ValidateSVGImages.swift <software-icons-directory>\n", stderr)
    exit(64)
}

let directory = URL(fileURLWithPath: arguments[1], isDirectory: true)
let fileManager = FileManager.default
let iconURLs: [URL]

do {
    iconURLs = try fileManager.contentsOfDirectory(
        at: directory,
        includingPropertiesForKeys: nil,
        options: [.skipsHiddenFiles]
    )
    .filter { $0.pathExtension.lowercased() == "svg" }
    .sorted { $0.lastPathComponent < $1.lastPathComponent }
} catch {
    fputs("Unable to enumerate SVG icons: \(error)\n", stderr)
    exit(1)
}

var failures: [String] = []

for iconURL in iconURLs {
    guard let image = NSImage(contentsOf: iconURL), image.isValid else {
        failures.append("\(iconURL.lastPathComponent): NSImage could not decode the SVG")
        continue
    }

    var targetRect = NSRect(x: 0, y: 0, width: 256, height: 256)
    guard image.cgImage(forProposedRect: &targetRect, context: nil, hints: nil) != nil else {
        failures.append("\(iconURL.lastPathComponent): SVG could not rasterize at 256 × 256")
        continue
    }
}

guard failures.isEmpty else {
    failures.forEach { fputs("- \($0)\n", stderr) }
    exit(1)
}

print("Decoded and rasterized \(iconURLs.count) bundled SVG icons with AppKit.")
