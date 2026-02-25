import json
import random

def generate_pixel_art():
    patterns = []
    
    # 8x8 Patterns
    templates_8x8 = [
        ("Smile", [
            [0,0,1,1,1,1,0,0],
            [0,1,0,0,0,0,1,0],
            [1,0,1,0,0,1,0,1],
            [1,0,0,0,0,0,0,1],
            [1,0,1,0,0,1,0,1],
            [1,0,0,1,1,0,0,1],
            [0,1,0,0,0,0,1,0],
            [0,0,1,1,1,1,0,0]
        ]),
        ("Heart", [
            [0,1,1,0,0,1,1,0],
            [1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1],
            [0,1,1,1,1,1,1,0],
            [0,0,1,1,1,1,0,0],
            [0,0,0,1,1,0,0,0],
            [0,0,0,0,0,0,0,0]
        ]),
    ]
    
    # Generate 100 patterns
    id_counter = 1
    
    # Add templates
    for name, grid in templates_8x8:
        patterns.append({
            "id": f"pixel_{id_counter:03d}",
            "name": name,
            "size": 8,
            "grid": grid,
            "palette": ["#ffffff", "#ff0000", "#000000", "#ffff00"]
        })
        id_counter += 1
        
    # Fill with 100 total
    while id_counter <= 100:
        size = random.choice([8, 12, 16])
        grid = [[random.randint(0, 4) for _ in range(size)] for _ in range(size)]
        # Make symmetric
        for r in range(size):
            for c in range(size // 2):
                grid[r][size-1-c] = grid[r][c]
                
        patterns.append({
            "id": f"pixel_{id_counter:03d}",
            "name": f"Pattern {id_counter}",
            "size": size,
            "grid": grid,
            "palette": ["#ffffff", "#4D96FF", "#6BCB77", "#FFD93D", "#FF6B6B"]
        })
        id_counter += 1
        
    with open("pixel_art.json", "w") as f:
        json.dump(patterns, f, indent=2)

if __name__ == "__main__":
    generate_pixel_art()
