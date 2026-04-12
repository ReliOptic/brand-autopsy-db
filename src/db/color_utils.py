"""HEX -> LAB color space conversion and distance calculation."""


def hex_to_rgb(hex_str: str) -> tuple[int, int, int]:
    """#RRGGBB -> (R, G, B)."""
    h = hex_str.lstrip("#")
    if len(h) == 3:
        h = h[0]*2 + h[1]*2 + h[2]*2
    return int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)


def rgb_to_lab(r: int, g: int, b: int) -> tuple[float, float, float]:
    """sRGB -> CIE LAB (D65 illuminant). Pure Python, no deps."""
    # Normalize to [0, 1]
    rn, gn, bn = r / 255.0, g / 255.0, b / 255.0

    # Linearize (inverse sRGB companding)
    def linearize(c):
        return ((c + 0.055) / 1.055) ** 2.4 if c > 0.04045 else c / 12.92

    rl, gl, bl = linearize(rn), linearize(gn), linearize(bn)

    # RGB -> XYZ (D65)
    x = rl * 0.4124564 + gl * 0.3575761 + bl * 0.1804375
    y = rl * 0.2126729 + gl * 0.7151522 + bl * 0.0721750
    z = rl * 0.0193339 + gl * 0.1191920 + bl * 0.9503041

    # Normalize to D65 white point
    x /= 0.95047
    y /= 1.00000
    z /= 1.08883

    # XYZ -> LAB
    def f(t):
        return t ** (1/3) if t > 0.008856 else 7.787 * t + 16/116

    fx, fy, fz = f(x), f(y), f(z)

    L = 116 * fy - 16
    a = 500 * (fx - fy)
    b_val = 200 * (fy - fz)

    return round(L, 2), round(a, 2), round(b_val, 2)


def hex_to_lab(hex_str: str) -> tuple[float, float, float]:
    """#RRGGBB -> (L, a, b)."""
    return rgb_to_lab(*hex_to_rgb(hex_str))


def color_distance(lab1: tuple, lab2: tuple) -> float:
    """CIE76 Delta E (Euclidean distance in LAB space)."""
    return sum((a - b) ** 2 for a, b in zip(lab1, lab2)) ** 0.5


def is_valid_hex(s: str) -> bool:
    """Check if string is a valid hex color."""
    s = s.strip().lstrip("#")
    if len(s) not in (3, 6):
        return False
    try:
        int(s, 16)
        return True
    except ValueError:
        return False
