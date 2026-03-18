$pagesDir = "c:\Users\hp\Documents\GitHub\portfolio-website\pages"
$linkTag = '    <link rel="stylesheet" href="../css/project-responsive.css">'
$searchString = '<link rel="stylesheet" href="../css/style.css">'

Get-ChildItem "$pagesDir\*.html" | Where-Object { $_.Name -ne "project.html" } | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -notmatch "project-responsive\.css") {
        $content = $content.Replace($searchString, "$searchString`r`n$linkTag")
        [System.IO.File]::WriteAllText($_.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Updated: $($_.Name)"
    } else {
        Write-Host "Already linked: $($_.Name)"
    }
}
