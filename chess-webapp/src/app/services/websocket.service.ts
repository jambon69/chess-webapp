import { Injectable, signal } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { Observable, fromEvent } from 'rxjs';
// import { User } from './user.interface';

export class User {
  id: string = "";
  username: string = "anonymous";
  color: string = "w";
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: Socket;

  // Signal pour gérer l'état de la liste des utilisateurs
  private usersSignal = signal<User[]>([]);
  public users = this.usersSignal.asReadonly();

  constructor() {
    // Initialise la connexion WebSocket avec des paramètres de reconnexion automatique
    // pour assurer une connexion robuste en cas de perte de connexion
    this.socket = io('http://localhost:3000', {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
      autoConnect: false
    });

    // Managing error messages
    this.socket.on("connect_error", (err) => {
      if (err.message === "invalid username") {
	alert("camarchepas");
      }
    });

    // Souscription aux nouveaux utilisateurs directement dans le service
    this.onNewUser().subscribe((user: User) => {
      this.usersSignal.update(users => [...users, user]);
      console.log(this.users());
    });
    this.listUsers().subscribe((userList: User[]) => {
      this.usersSignal.update(users => userList);
      console.log(userList);
    });
  }

  /**
   * Se connecte à la socket avec son username / color to start a game
   */
  connect(user: User) {
    this.socket.auth = user;
    this.socket.connect();
  }
   
  /**
   * Surveille l'état de connexion au serveur WebSocket
   * Retourne un Observable qui émet lorsque la connexion est établie
   */
  onConnect(): Observable<void> {
    console.log("connected");
    return fromEvent(this.socket, 'connect') as Observable<void>;
  }

  /**
   * Surveille les déconnexions du serveur WebSocket
   * Retourne un Observable qui émet lorsque la connexion est perdue
   */
  onDisconnect(): Observable<void> {
    return fromEvent(this.socket, 'disconnect') as Observable<void>;
  }

  /**
   * Capture les erreurs de communication WebSocket
   * Retourne un Observable qui émet en cas d'erreur de connexion ou de communication
   */
  onError(): Observable<Error> {
    return fromEvent(this.socket, 'error') as Observable<Error>;
  }

  /**
   * Écoute l'arrivée de nouveaux utilisateurs
   * Retourne un Observable qui émet à chaque fois qu'un nouvel utilisateur est ajouté
   */
  onNewUser(): Observable<User> {
    return fromEvent(this.socket, 'new-user') as Observable<User>;
  }

  /**
   * Envoie les informations d'un nouvel utilisateur au serveur
   * Cette méthode est void car elle ne fait qu'émettre un événement sans attendre de réponse
   */
  sendMessage(user: User): void {
    console.log(user);
    this.socket.emit('new-user', user);
  }

  listUsers(): Observable<User[]> {
    return fromEvent(this.socket, "users") as Observable<User[]>;
  }
}
