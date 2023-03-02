"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Users", [
      {
        name: "Anastase Tuyizere",
        email: "tuyizere@gmail.com",
        password:
          "$2a$12$ZsuuWuDmqlfYAcwCS2smpuAnvSbdO0avOUfUeRj1EClCTx26U1S4G",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "John Manzi",
        email: "manzi@gmail.com",
        password:
          "$2a$12$ZsuuWuDmqlfYAcwCS2smpuAnvSbdO0avOUfUeRj1EClCTx26U1S4G",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
