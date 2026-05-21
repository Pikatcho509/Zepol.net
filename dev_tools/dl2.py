import urllib.request
import urllib.parse
import json
import time

chars = {
    "Naruto Uzumaki": "naruto_uzumaki",
    "Haku": "haku",
    "Itachi Uchiha": "itachi_uchiha",
    "Kakashi Hatake": "kakashi_hatake",
    "Pain": "pain",
    "Jiraiya": "jiraiya",
    "Madara Uchiha": "madara_uchiha",
    "Might Guy": "might_guy",
    "Gaara": "gaara",
    "Asta": "asta",
    "Monkey D. Luffy": "monkey_d_luffy"
}

for name, filename in chars.items():
    url = f"https://api.jikan.moe/v4/characters?q={urllib.parse.quote(name)}&limit=1"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            if data['data']:
                img_url = data['data'][0]['images']['jpg']['image_url']
                req_img = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(req_img) as resp_img:
                    with open(f"c:/Users/USER/Documents/web/assets/{filename}.jpg", "wb") as f:
                        f.write(resp_img.read())
                print(f"Downloaded {name} from {img_url}")
            else:
                print(f"No result for {name}")
    except Exception as e:
        print(f"Error {name}: {e}")
    time.sleep(1)
