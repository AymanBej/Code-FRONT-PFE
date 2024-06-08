import Mock from "../mock";
import shortId from "shortid";

const NotificationDB = {
  list: [
    {
      id: shortId.generate(),
      heading: "Alerte d'ajout",
      icon: { name: "notifications", color: "secondary" },
      title: "Nouvelle(s) demande(s) SharePoint !",
      subtitle: "Consulter votre liste des demandes dans SharePoint !",
      path: "demandes" // Utiliser un chemin relatif à partir de la racine de l'application
    },
    {
      id: shortId.generate(),
      heading: "Alerte d'acceptation",
      icon: { name: "notifications", color: "success" },
      title: "Acceptation demande SharePoint !",
      subtitle: "Voir votre liste des demandes SharePoint !",
      path: "demandesUser" // Utiliser un chemin relatif à partir de la racine de l'application
    },
    {
      id: shortId.generate(),
      heading: "Alerte de refus",
      icon: { name: "notifications", color: "error" },
      title: "Refus demande SharePoint !",
      subtitle: "Voir votre liste des demandes SharePoint !",
      path: "demandesUser" // Utiliser un chemin relatif à partir de la racine de l'application
    },
  ]
};

Mock.onGet("/api/notification").reply(() => {
  const response = NotificationDB.list;
  return [200, response];
});

Mock.onPost("/api/notification/add").reply(() => {
  const response = NotificationDB.list;
  return [200, response];
});

Mock.onPost("/api/notification/delete").reply((config) => {
  let { id } = JSON.parse(config.data);
  console.log(config.data);

  const response = NotificationDB.list.filter((notification) => notification.id !== id);
  NotificationDB.list = [...response];
  return [200, response];
});

Mock.onPost("/api/notification/delete-all").reply(() => {
  NotificationDB.list = [];
  const response = NotificationDB.list;
  return [200, response];
});
