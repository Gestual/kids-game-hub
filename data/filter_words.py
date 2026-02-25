import os

def filter_dictionary(lang):
    path = f"C:/Users/nacim/.gemini/antigravity/scratch/kids-game-hub/data/words/{lang}.txt"
    if not os.path.exists(path):
        return
    
    with open(path, 'r', encoding='utf-8') as f:
        words = f.readlines()
    
    # Simple filtering: 4-8 chars, only lowercase letters (no accents for simplicity in grid)
    # Actually, for French/Spanish, we might keep accents but grid logic should handle them.
    # But for Word Search, kids prefer simple A-Z.
    
    filtered = []
    for w in words:
        w = w.strip().lower()
        if 4 <= len(w) <= 8 and w.isalpha():
            # Exclude very rare combos or long complex words
            # For now, just taking a random sample of 2000 common-ish length words
            filtered.append(w)
    
    import random
    if len(filtered) > 2000:
        filtered = random.sample(filtered, 2000)
        
    with open(path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(filtered))

for lang in ['en', 'fr', 'es']:
    filter_dictionary(lang)
