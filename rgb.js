// --- Helper Function for MIX tool reactions ---
function mixReactions(pixel){
    if(!pixel || !pixelMap) return;
    let reactions = pixel.reactions;
    if(!reactions) return;
    let orthogonal = [[0,-1],[0,1],[-1,0],[1,0]];
    for(let [dx,dy] of orthogonal){
        let neighbor = pixelMap[pixel.x+dx]?.[pixel.y+dy];
        if(!neighbor) continue;
        if(reactions[neighbor.element]){
            pixel.element = reactions[neighbor.element].elem;
            return;
        }
    }
}

// --- Primary Colors ---
elements.red = {
    color:"#ff0000",
    behavior:behaviors.POWDER,
    category:"powders",
    state:"solid",
    reactions:{ blue:{elem:"magenta",chance:1}, green:{elem:"yellow",chance:1} },
    tool: function(pixel, toolName){ if(toolName==="mix") mixReactions(pixel); }
};

elements.green = {
    color:"#00ff00",
    behavior:behaviors.POWDER,
    category:"powders",
    state:"solid",
    reactions:{ red:{elem:"yellow",chance:1}, blue:{elem:"cyan",chance:1} },
    tool: function(pixel, toolName){ if(toolName==="mix") mixReactions(pixel); }
};

elements.blue = {
    color:"#0000ff",
    behavior:behaviors.POWDER,
    category:"powders",
    state:"solid",
    reactions:{ red:{elem:"magenta",chance:1}, green:{elem:"cyan",chance:1} },
    tool: function(pixel, toolName){ if(toolName==="mix") mixReactions(pixel); }
};

// --- Secondary Colors ---
elements.magenta = {
    color:"#ff00ff",
    behavior:behaviors.POWDER,
    category:"powders",
    state:"solid",
    reactions:{ green:{elem:"white",chance:1} },
    tool: function(pixel, toolName){ if(toolName==="mix") mixReactions(pixel); }
};

elements.yellow = {
    color:"#ffff00",
    behavior:behaviors.POWDER,
    category:"powders",
    state:"solid",
    reactions:{ blue:{elem:"white",chance:1} },
    tool: function(pixel, toolName){ if(toolName==="mix") mixReactions(pixel); }
};

elements.cyan = {
    color:"#00ffff",
    behavior:behaviors.POWDER,
    category:"powders",
    state:"solid",
    reactions:{ red:{elem:"white",chance:1} },
    tool: function(pixel, toolName){ if(toolName==="mix") mixReactions(pixel); }
};

// --- White (copies orthogonal neighbors outside the mod) ---
elements.white = {
    color:"#ffffff",
    behavior:behaviors.POWDER,
    category:"powders",
    state:"solid",
    tick: function(pixel){
        let orthogonal = [[0,-1],[0,1],[-1,0],[1,0]];
        for(let [dx,dy] of orthogonal){
            let neighbor = pixelMap[pixel.x+dx]?.[pixel.y+dy];
            if(!neighbor) continue;
            let modColors = ["red","green","blue","magenta","yellow","cyan","white"];
            if(modColors.includes(neighbor.element)) continue;
            pixel.element = neighbor.element;
            return;
        }
    }
};
