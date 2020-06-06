-module(exercises).
-export([change/1, sumOfCubesOfOdds/1, powers/3]).

%% Accepts a number of U.S. cents and returns a tuple containing
%% a success value and a list with the smallest number of U.S. 
%% quarters, dimes, nickels, and pennies.
change(Amount) when Amount < 0 -> 
    {false, "amount cannot be negative"};
change(Amount) ->
    Coins = [25, 10, 5, 1],
    Results = loop(Coins, Amount),
    {true, Results}.

%% Helper function for change(). Iterates through Coins and returns
%% the smallest number of quarters, dimes, nickels and pennies given
%% an Amount.
loop(L, Amount) -> loop(L, Amount, []).
loop([], _, Acum) -> Acum;
loop([H|T], Amount, Acum) ->
    loop(T, Amount rem H, Acum ++ [Amount div H]).


%% Given a List, the function returns the sum of cubes of odds.
sumOfCubesOfOdds(List) ->
    Odd_cubes = [X*X*X || X <- List, X rem 2 =/= 0],
    lists:sum(Odd_cubes).

%% Function that sends successive powers of a base starting at 1
%% up to some limit to a Pid.
powers(Base, Limit, Pid) ->
    (fun Loop(Acum) ->
        if
            Acum =< Limit ->
                Pid ! Acum,
                Loop(Acum * Base);
            true -> 
                ok
        end
    end)(1).
