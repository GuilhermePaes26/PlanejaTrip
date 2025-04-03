// Inicia o replica set com o host configurado como "localhost:27017"
rs.initiate({
    _id: "rs0",
    members: [
      { _id: 0, host: "localhost:27017" }
    ]
  });
  
  // Em seguida, reconfigura para garantir que o host seja "localhost:27017"
  var cfg = rs.conf();
  cfg.members[0].host = "localhost:27017";
  rs.reconfig(cfg, { force: true });
  
  // Exibe a nova configuração e o status
  printjson(rs.conf());
  printjson(rs.status());
  