$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $word.Documents.Open("C:\Users\itpua\Dev\Work\al-andalus\alandalus-alimam\04-Surat Pemberitahuan Kedatangan Santri Baru 2026-2027-REVISED.docx")
$selection = $word.Selection

$FindText = " yang telah dilegalisir"
$ReplaceText = ""
$selection.Find.Execute($FindText, $false, $false, $false, $false, $false, $true, 1, $false, $ReplaceText, 2)

$FindText2 = "[LINK KONFIRMASI]"
$ReplaceText2 = "Menu Welcome Day di Dashboard Pendaftar"
$selection.Find.Execute($FindText2, $false, $false, $false, $false, $false, $true, 1, $false, $ReplaceText2, 2)

$doc.Save()
$doc.ExportAsFixedFormat("C:\Users\itpua\Dev\Work\al-andalus\alandalus-alimam\public\documents\Surat_Pemberitahuan_Kedatangan.pdf", 17)
$doc.ExportAsFixedFormat("C:\Users\itpua\Dev\Work\al-andalus\alandalus-ululalbaab\public\documents\Surat_Pemberitahuan_Kedatangan.pdf", 17)
$doc.Close()
$word.Quit()
