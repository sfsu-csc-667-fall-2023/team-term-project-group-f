exports.up = async (pgm) => {
    await pgm.createTable("test_table", {
      id: "id",
      created_at: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("current_timestamp"),
      },
      test_string: {
        type: "varchar(1000)",
        notNull: true,
      },
    });
  };
  
  exports.down = async (pgm) => {
    await pgm.dropTable("test_table");
  };