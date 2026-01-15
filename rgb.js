// --- Primary Colors ---
elements.red = {
    color: "#ff0000",
    behavior: behaviors.POWDER,
    category: "solids",
    state: "solid",
    reactions: {
        blue: { elem: "magenta", chance: 1 },
        green: { elem: "yellow", chance: 1 }
    }
};

elements.green = {
    color: "#00ff00",
    behavior: behaviors.POWDER,
    category: "solids",
    state: "solid",
    reactions: {
        red: { elem: "yellow", chance: 1 },
        blue: { elem: "cyan", chance: 1 }
    }
};

elements.blue = {
    color: "#0000ff",
    behavior: behaviors.POWDER,
    category: "solids",
    state: "solid",
    reactions: {
        red: { elem: "magenta", chance: 1 },
        green: { elem: "cyan", chance: 1 }
    }
};

// --- Secondary Colors ---
elements.magenta = {
    color: "#ff00ff",
    behavior: behaviors.POWDER,
    category: "solids",
    state: "solid",
    reactions: {
        green: { elem: "white", chance: 1 }
    }
};

elements.yellow = {
    color: "#ffff00",
    behavior: behaviors.POWDER,
    category: "solids",
    state: "solid",
    reactions: {
        blue: { elem: "white", chance: 1 }
    }
};

elements.cyan = {
    color: "#00ffff",
    behavior: behaviors.POWDER,
    category: "solids",
    state: "solid",
    reactions: {
        red: { elem: "white", chance: 1 }
    }
};

// --- White (Copy Element) ---
elements.white = {
    color: "#ffffff",
    behavior: behaviors.POWDER,
    category: "solids",
    state: "solid",
    tick: function(pixel) {
        // Only check orthogonal neighbors
        let orthogonal = [
            [0, -1], // up
            [0, 1],  // down
            [-1, 0], // left
            [1, 0]   // right
        ];

        let ourElements = ["red","green","blue","magenta","yellow","cyan","white"];

        for (let [dx, dy] of orthogonal) {
            let neighbor = pixelMap[pixel.x + dx]?.[pixel.y + dy];
            if (!neighbor) continue;

            // Skip other pixels from this mod
            if (ourElements.includes(neighbor.element)) continue;

            // Transform into the neighbor
            pixel.element = neighbor.element;
            return;
        }
    }
};
