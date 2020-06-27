-module(strangeserver).
-export([serve/0]).

%% Server that writes a message to a process depending on what it
%% receives. If server does not receive anything for 3 seconds,
%% it will print a message to standard ouput
serve() ->
  receive
    {multiply, FirstNumber, SecondNumber, Pid} ->
      Pid ! (FirstNumber * SecondNumber),
      serve();
    {length, String, Pid} ->
      Pid ! length(String),
      serve();
    _ ->
      io:format("I don't understand~n"),
      serve()
  after 3000 -> 
    io:format("I am bored~n")
  end.