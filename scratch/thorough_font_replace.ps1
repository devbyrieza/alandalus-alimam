$docPath = "C:\Users\itpua\Dev\Work\al-andalus\alandalus-alimam\04-Surat Pemberitahuan Kedatangan Santri Baru 2026-2027-REVISED.docx"
$pdfPath = "C:\Users\itpua\Dev\Work\al-andalus\alandalus-alimam\04-Surat Pemberitahuan Kedatangan Santri Baru 2026-2027-REVISED.pdf"

$destDir = "C:\Users\itpua\Dev\Work\al-andalus\eoffice-alimam-new\public\files"
if (!(Test-Path $destDir)) {
    New-Item -ItemType Directory -Force -Path $destDir | Out-Null
}

$newDocDest = Join-Path $destDir "001-Surat_Pemberitahuan_Kedatangan_Santri_Baru_2026-2027.docx"
$newPdfDest = Join-Path $destDir "001-Surat_Pemberitahuan_Kedatangan_Santri_Baru_2026-2027.pdf"

Write-Output "Memulai Word COM..."
$word = New-Object -ComObject Word.Application
$word.Visible = $false

try {
    Write-Output "Membuka dokumen: $docPath"
    $doc = $word.Documents.Open($docPath)

    # Lakukan penggantian font secara menyeluruh di semua bagian dokumen
    Write-Output "Mengganti seluruh font Calibri menjadi Arial..."
    
    # 1. Ganti font di Paragraphs
    foreach ($p in $doc.Paragraphs) {
        if ($p.Range.Font.Name -eq "Calibri") {
            $p.Range.Font.Name = "Arial"
        }
    }

    # 2. Ganti font di Tables
    foreach ($t in $doc.Tables) {
        foreach ($row in $t.Rows) {
            foreach ($cell in $row.Cells) {
                if ($cell.Range.Font.Name -eq "Calibri") {
                    $cell.Range.Font.Name = "Arial"
                }
            }
        }
    }

    # 3. Ganti font di semua Story Ranges (termasuk Header & Footer)
    foreach ($story in $doc.StoryRanges) {
        $story.Find.ClearFormatting()
        $story.Find.Replacement.ClearFormatting()
        $story.Find.Font.Name = "Calibri"
        $story.Find.Replacement.Font.Name = "Arial"
        $story.Find.Execute("", $false, $false, $false, $false, $false, $true, 1, $true, "", 2) | Out-Null
        
        $nextStory = $story.NextStoryRange
        while ($null -ne $nextStory) {
            $nextStory.Find.ClearFormatting()
            $nextStory.Find.Replacement.ClearFormatting()
            $nextStory.Find.Font.Name = "Calibri"
            $nextStory.Find.Replacement.Font.Name = "Arial"
            $nextStory.Find.Execute("", $false, $false, $false, $false, $false, $true, 1, $true, "", 2) | Out-Null
            $nextStory = $nextStory.NextStoryRange
        }
    }

    # Simpan kembali dokumen
    Write-Output "Menyimpan dokumen Word..."
    $doc.Save()

    # Ekspor ke PDF
    Write-Output "Mengekspor ke PDF..."
    $doc.SaveAs($pdfPath, 17)

    $doc.Close()
    $doc = $null
    
    # Copy ke folder publik E-Office baru
    Write-Output "Menyalin file ke direktori publik E-Office..."
    Copy-Item -Path $docPath -Destination $newDocDest -Force
    Copy-Item -Path $pdfPath -Destination $newPdfDest -Force

    Write-Output "Berhasil memproses dan menyalin file!"
    Write-Output "DOCX baru: $newDocDest"
    Write-Output "PDF baru: $newPdfDest"
}
catch {
    Write-Error "Terjadi kesalahan: $_"
}
finally {
    if ($doc) {
        $doc.Close()
    }
    $word.Quit()
    [System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
    Remove-Variable word
}
