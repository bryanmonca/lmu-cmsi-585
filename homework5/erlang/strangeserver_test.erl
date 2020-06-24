%
main(_) ->
    Main = self(),
    Server = spawn(strangeserver, serve, []),
    Server ! {multiply, 3, 10, Main},
    receive
        P -> 30 = P
    end,
    Server ! whatever,
    Server ! {length, "😂😂", Main},
    Server ! {length, "café", Main},
    receive
        Q -> 2 = Q
    end,
    timer:sleep(3100),
    receive
        R -> 4 = R
    end,
    io:format("All tests passed~n").