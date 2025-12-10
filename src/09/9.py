import fileinput
from itertools import combinations
from shapely.geometry import Polygon, box
from shapely.prepared import prep


def calculate_area(p1: tuple[int, int], p2: tuple[int, int]) -> int:
    """Calculate rectangle area including both corners."""
    return (abs(p2[0] - p1[0]) + 1) * (abs(p2[1] - p1[1]) + 1)


def part_1(data: str) -> int:
    """Find the largest rectangle using any two red tiles as opposite corners."""
    tiles = [tuple(map(int, line.split(","))) for line in data.splitlines() if line]
    return max(calculate_area(p1, p2) for p1, p2 in combinations(tiles, 2))


def part_2(data: str) -> int:
    """Find the largest rectangle fully contained within the polygon."""
    tiles = [tuple(map(int, line.split(","))) for line in data.splitlines() if line]
    polygon = Polygon(tiles)
    prepared_polygon = prep(polygon)

    max_area = 0
    for p1, p2 in combinations(tiles, 2):
        area = calculate_area(p1, p2)
        if area <= max_area:
            continue

        rectangle = box(
            min(p1[0], p2[0]), min(p1[1], p2[1]), max(p1[0], p2[0]), max(p1[1], p2[1])
        )
        if prepared_polygon.contains(rectangle):
            max_area = area

    return max_area


def is_fully_contained(
    edges: list[tuple[int, int, int, int]],
    min_x: int,
    min_y: int,
    max_x: int,
    max_y: int,
) -> bool:
    """Check if the rectangle is fully contained."""
    for e_min_x, e_min_y, e_max_x, e_max_y in edges:
        if min_x < e_max_x and max_x > e_min_x and min_y < e_max_y and max_y > e_min_y:
            return False
    return True


def main():
    """Execute the solution for both parts."""
    input_data = ""
    for line in fileinput.input():
        input_data += line
    part_1(input_data)
    part_2(input_data)


if __name__ == "__main__":
    main()
    