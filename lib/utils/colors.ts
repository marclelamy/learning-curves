export const COLORS = [
    // Classic Brutal
    {
        bg: "bg-white",
        text: "text-black",
        border: "border-black",
        line: "#000000",
        grid: "#000000"
    },
    // Matrix
    {
        bg: "bg-black",
        text: "text-green-500",
        border: "border-green-500",
        line: "#00ff00",
        grid: "#004400"
    },
    // Neon Pink
    {
        bg: "bg-violet-950",
        text: "text-pink-500",
        border: "border-pink-500",
        line: "#ff00ff",
        grid: "#550055"
    },
    // Blood Error
    {
        bg: "bg-black",
        text: "text-red-500",
        border: "border-red-500",
        line: "#ff0000",
        grid: "#330000"
    },
    // Amber Monitor
    {
        bg: "bg-black",
        text: "text-yellow-500",
        border: "border-yellow-500",
        line: "#ffaa00",
        grid: "#332200"
    },
    // One Dark Pro
    {
        bg: "bg-[#282c34]",
        text: "text-[#abb2bf]",
        border: "border-[#528bff]",
        line: "#61afef",
        grid: "#3b4048"
    },
    // Dracula
    {
        bg: "bg-[#282a36]",
        text: "text-[#f8f8f2]",
        border: "border-[#bd93f9]",
        line: "#ff79c6",
        grid: "#44475a"
    },
    // Tokyo Night
    {
        bg: "bg-[#1a1b26]",
        text: "text-[#a9b1d6]",
        border: "border-[#7aa2f7]",
        line: "#7dcfff",
        grid: "#24283b"
    },
    // Cyber Ice
    {
        bg: "bg-cyan-950",
        text: "text-blue-200",
        border: "border-blue-200",
        line: "#66ccff",
        grid: "#001133"
    },
    // Digital Rain
    {
        bg: "bg-emerald-900",
        text: "text-green-300",
        border: "border-green-300",
        line: "#33ff33",
        grid: "#003300"
    },
    // Nord
    {
        bg: "bg-[#2e3440]",
        text: "text-[#d8dee9]",
        border: "border-[#88c0d0]",
        line: "#81a1c1",
        grid: "#3b4252"
    },
    // Monokai Pro
    {
        bg: "bg-[#2d2a2e]",
        text: "text-[#fcfcfa]",
        border: "border-[#ffd866]",
        line: "#ff6188",
        grid: "#403e41"
    },
    // Catppuccin
    {
        bg: "bg-[#1e1e2e]",
        text: "text-[#cdd6f4]",
        border: "border-[#89b4fa]",
        line: "#f5c2e7",
        grid: "#313244"
    },
    // Shades of Purple
    {
        bg: "bg-[#2d2b55]",
        text: "text-[#fff]",
        border: "border-[#fad000]",
        line: "#ff26ce",
        grid: "#1e1e3f"
    },
    // Neon Sunset
    {
        bg: "bg-orange-950",
        text: "text-amber-300",
        border: "border-amber-300",
        line: "#ffaa33",
        grid: "#331100"
    }
] as const

export function generateRandomVariant() {
    const colorScheme = COLORS[Math.floor(Math.random() * COLORS.length)]
    
    return {
        id: `RANDOM_${Math.random().toString(36).substr(2, 9)}`,
        title: `RANDOM_SYS_${Math.floor(Math.random() * 1000)}.dat`,
        style: {
            ...colorScheme,
            opacity: 0.3
        }
    }
} 