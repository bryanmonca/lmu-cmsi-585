%
expectReceive(N) ->
    receive P -> P = N end.

main(_) ->
    {true, [0, 0, 1, 3]} = exercises:change(8),
    {true, [3, 2, 0, 2]} = exercises:change(97),
    {true, [4000000, 0, 0, 1]} = exercises:change(100000001),
    {true, [1, 1, 1, 2]} = exercises:change(42),
    {false, "amount cannot be negative"} = exercises:change(-5),

    219 = exercises:sumOfCubesOfOdds([7, 1, 0, 10, -5]),
    0 = exercises:sumOfCubesOfOdds([0, 2, 10000]),
    0 = exercises:sumOfCubesOfOdds([]),
    -1 = exercises:sumOfCubesOfOdds([0, -1, 8]),

    Main = self(),
    spawn(exercises, powers, [2, -5, Main]),
    spawn(exercises, powers, [7, 0, Main]),
    spawn(exercises, powers, [3, 1, Main]),
    expectReceive(1),
    spawn(exercises, powers, [2, 63, Main]),
    [expectReceive(N) || N <- [1, 2, 4, 8, 16, 32]],
    spawn(exercises, powers, [2, 64, Main]),
    [expectReceive(N) || N <- [1, 2, 4, 8, 16, 32, 64]],
    io:format("All tests passed~n", []).