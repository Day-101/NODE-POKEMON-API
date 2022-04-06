const validTypes = [
  "Plante",
  "Poison",
  "Feu",
  "Eau",
  "Insecte",
  "Vol",
  "Normal",
  "Electrik",
  "Fée",
];

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Le nom ne peut être vide.",
          },
          notNull: { msg: "Le nom est une propriété requise." },
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Utilisez uniquement des nombres entiers pour les points de dégâts.",
          },
          min: {
            args: [0],
            msg: "Les points de vie doivent être supérieurs ou égales à 0",
          },
          max: {
            args: [999],
            msg: "Les points de vie doivent être inférieurs ou égales à 999",
          },
          notNull: { msg: "Les points de dégâts sont une propriété requise." },
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Utilisez uniquement une URL valide pour l'image.",
          },
          min: {
            args: [0],
            msg: "Les points de dégâts doivent être supérieurs ou égales à 0",
          },
          max: {
            args: [99],
            msg: "Les points de dégâts doivent être inférieurs ou égales à 99",
          },
          notNull: {
            msg: "L'image est une propriété requise.",
          },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: {
            msg: "L'image doit être une URL.",
          },
          notNull: { msg: "L'image est une propriété requise." },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue("types").split(",");
        },
        set(types) {
          this.setDataValue("types", types.join());
        },
        validate: {
          isTypesValid(value) {
            if (!value) {
              throw new Error("Un pokemon doit au moins avoir un type.");
            }
            if (value.split(",").length > 3) {
              throw new Error("Un pokemon ne peux avoir plus de trois type.");
            }
            value.split(",").forEach((type) => {
              if (!validTypes.includes(type)) {
                throw new Error(
                  `Le type d'un pokemon doit appartenir à la liste suivante : ${validTypes}`
                );
              }
            });
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
