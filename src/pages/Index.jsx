import { useState } from "react";
import { Box, Button, Flex, Grid, Text, useToast } from "@chakra-ui/react";
import { FaTimes, FaRegCircle } from "react-icons/fa";

const Index = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const toast = useToast();

  const handleClick = (index) => {
    const newBoard = [...board];
    if (newBoard[index] || calculateWinner(board)) {
      return;
    }
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <Flex direction="column" align="center" justify="center" h="100vh">
      <Text fontSize="2xl" mb={4}>
        {winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? "X" : "O"}`}
      </Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={2}>
        {board.map((value, index) => (
          <Button key={index} height="100px" width="100px" onClick={() => handleClick(index)} disabled={!!winner}>
            {value === "X" ? <FaTimes size="2em" /> : value === "O" ? <FaRegCircle size="2em" /> : null}
          </Button>
        ))}
      </Grid>
      <Button mt={4} colorScheme="teal" onClick={handleReset}>
        Reset Game
      </Button>
    </Flex>
  );
};

export default Index;
