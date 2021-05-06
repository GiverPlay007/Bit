package me.giverplay.server;

import me.giverplay.server.websockets.EspWebSocket;
import me.giverplay.server.websockets.PanelWebSocket;
import spark.Spark;

public class Main {
  public static void main(String[] args) {
    registerWebSockets();
    startSpark();
  }

  private static void registerWebSockets() {
    Spark.webSocket("/panel", PanelWebSocket.class);
    Spark.webSocket("/esp", EspWebSocket.class);
  }

  private static void startSpark() {
    Spark.port(3001);
    Spark.init();
  }
}
