function CoinsTable() {
  return (
    <ul>
      {Array.from({ length: 10 }, (_, i) => (
        <li key={i}>Coin {i + 1}</li>
      ))}
      .
      <br />
      .
      <br />.
    </ul>
  );
}

export default CoinsTable;
