try {
    Add-Type -AssemblyName System.Drawing
    [Windows.Globalization.Language, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null
    [Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null
    [Windows.Security.Cryptography.CryptographicBuffer, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null
    [Windows.Storage.Streams.InMemoryRandomAccessStream, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null
    
    $engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()
    if ($engine) {
        Write-Host "OCR Engine is available: $($engine.RecognizerLanguage.LanguageTag)"
    } else {
        Write-Host "OCR Engine is null"
    }
} catch {
    Write-Host "Error: $_"
}
