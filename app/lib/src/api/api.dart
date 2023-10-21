import 'dart:convert';

import 'package:http/http.dart' as http;

class Server {
  Server._();
  static final Server instance = Server._();
  static final http.Client _client = http.Client();

  static const authority = 'localhost:3000';

  static Uri _getUri(String path) {
    return Uri.http(Server.authority, path);
  }

  static Future<http.Response> post(String path,
      {Object? body,
      Map<String, String>? headers,
      Encoding? encoding,
      String? accessToken}) async {
    // Set default headers
    headers ??= <String, String>{};
    headers.putIfAbsent("Content-Type", () => "application/json");
    headers.putIfAbsent("Accept", () => "application/json");
    if (accessToken != null) {
      headers.putIfAbsent("Authorization", () => "Bearer $accessToken");
    }

    return await Server._client.post(
      _getUri(path),
      body: body,
      headers: headers,
      encoding: encoding,
    );
  }

  static Future<http.Response> get(
      String path, Map<String, String>? headers, String? accessToken) async {
    // Set default headers
    headers ??= <String, String>{};
    headers.putIfAbsent("Accept", () => "application/json");
    if (accessToken != null) {
      headers.putIfAbsent("Authorization", () => "Bearer $accessToken");
    }

    return await Server._client.get(
      _getUri(path),
      headers: headers,
    );
  }
}
