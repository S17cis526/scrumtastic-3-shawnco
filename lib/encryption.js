'use strict';

module.exports =  new Encryption();

const secret = 'batteryhorsestaplecorrect';
const algorithm = 'aes-256';
const crypto = require('crypto');

class Encryption{
  // create random value to use as salt
  salt(){
    return crypto.randomBytes(32).toString('hex').slice(32);
  }

  // create a cryptographic hash using salt
  digest(plaintext){
    const hash = crypto.createHash('sha256');
    hash.update(plaintext);
    hash.update(secret);
    return hash.digest('hex');
  }

  encypher(plaintext){
    const cypher = crypto.createCypher(algorithm, secret);
    var encrypted = cypher.update(plaintext, 'utf8', 'hex');
    encrypted += cypher.final('hex');
    return encrypted;
  }

  decrypt(cryptext){
    const decypher = crypto.createCypher(algorithm, secret);
    var decyphered = decypher.update(cryptext, 'hex', 'utf8');
    decyphered += decypher.final('utf8');
    return decyphered;
  }
}
