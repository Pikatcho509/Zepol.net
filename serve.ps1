$port = 8765
$root = "c:\Users\pikat\OneDrive\Documents\15 mai 26"

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Serveur Zepol OK: http://localhost:$port"

$mime = @{
    '.html'='text/html; charset=utf-8'
    '.css'='text/css'
    '.js'='application/javascript; charset=utf-8'
    '.png'='image/png'
    '.jpg'='image/jpeg'
    '.jfif'='image/jpeg'
    '.json'='application/json'
    '.svg'='image/svg+xml'
    '.ico'='image/x-icon'
}

while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $path = $ctx.Request.Url.LocalPath
    if ($path -eq '/') { $path = '/index.html' }
    $file = Join-Path $root ($path.TrimStart('/') -replace '/','\')
    if (Test-Path $file -PathType Leaf) {
        $ext = [IO.Path]::GetExtension($file).ToLower()
        if ($mime.ContainsKey($ext)) {
            $ct = $mime[$ext]
        } else {
            $ct = 'application/octet-stream'
        }
        $bytes = [IO.File]::ReadAllBytes($file)
        $ctx.Response.ContentType = $ct
        $ctx.Response.ContentLength64 = $bytes.Length
        $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
        $ctx.Response.StatusCode = 404
        $b = [Text.Encoding]::UTF8.GetBytes('Not found')
        $ctx.Response.OutputStream.Write($b, 0, $b.Length)
    }
    $ctx.Response.OutputStream.Close()
}

