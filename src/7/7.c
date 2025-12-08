#include <stdio.h>
#include <string.h>

#define N 141
#define M (N + 1)
#define HALF (N >> 1)
#define SPLIT '^'

static long long sums[N];

int main()
{
    char **input;
    char *line = NULL;
    size_t size;
    int i = 0;
    int splits = 0;
    sums[HALF] = 1;
    int col = HALF, end = HALF + 1;
    while (getline(&line, &size, stdin) > 0) {
        if (i % 2 == 1 || i == 0) {
            i++;
            continue;
        }
        for (int j = col; j < end; ++j) {
            if (line[j] == SPLIT && sums[j]) {
                ++splits;
                sums[j - 1] += sums[j];
                sums[j + 1] += sums[j];
                sums[j] = 0;
            }
        }
        i++;
        col--;
        end++;
    }
    long long worlds = 0;
    for (int j = 0; j < N; j++) {
        worlds += sums[j];
    }
    printf("%d %lld", splits, worlds);
}

