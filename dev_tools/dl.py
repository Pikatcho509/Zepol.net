import urllib.request
urls = {
    "naruto_uzumaki": "https://upload.wikimedia.org/wikipedia/en/9/9a/NarutoUzumaki.png",
    "haku": "https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/Haku_Naruto.png/220px-Haku_Naruto.png",
    "itachi_uchiha": "https://upload.wikimedia.org/wikipedia/en/c/c9/ItachiUchiha.png",
    "kakashi_hatake": "https://upload.wikimedia.org/wikipedia/en/2/22/KakashiHatake.png",
    "pain": "https://upload.wikimedia.org/wikipedia/en/b/b3/Pain_Naruto.png",
    "jiraiya": "https://upload.wikimedia.org/wikipedia/en/4/4c/Jiraiya_%28Naruto%29.png",
    "madara_uchiha": "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Madara_Uchiha.png/220px-Madara_Uchiha.png",
    "might_guy": "https://upload.wikimedia.org/wikipedia/en/thumb/e/ef/Might_Guy.png/220px-Might_Guy.png",
    "gaara": "https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/Gaarapreship.png/220px-Gaarapreship.png",
    "asta": "https://upload.wikimedia.org/wikipedia/en/b/bf/Asta_%28Black_Clover%29.jpg",
    "monkey_d._luffy": "https://upload.wikimedia.org/wikipedia/en/a/a4/Monkey_D._Luffy.png"
}
for name, url in urls.items():
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as resp:
            data = resp.read()
            with open(f"c:/Users/USER/Documents/web/assets/{name}.png", "wb") as f:
                f.write(data)
        print(f"Downloaded {name}")
    except Exception as e:
        print(f"Failed {name}: {e}")
