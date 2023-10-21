import 'dart:convert';

import 'package:app2/src/api/api.dart';
import 'package:bloc/bloc.dart';
import 'package:http/src/response.dart';
import 'package:meta/meta.dart';

import '../models.dart';

part 'auth_event.dart';
part 'auth_state.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  AuthBloc() : super(Unauthenticated()) {
    on<LoginEvent>((event, emit) async {
      emit(await _handleLogin(event));
    });
    on<RegisterEvent>((event, emit) async {
      emit(await _handleRegistration(event));
    });
    on<LogoutEvent>((event, emit) async {
      emit(Unauthenticated());
    });
  }

  Future<AuthState> _handleLogin(LoginEvent event) async {
    print("Login");

    final body = jsonEncode({'email': event.email, 'password': event.password});

    Response resp;
    try {
      resp = await Server.post(
        "/auth/login",
        body: body,
      );
    } catch (err) {
      print(err);
      return Unauthenticated();
    }
    if (resp.statusCode != 200) {
      return Unauthenticated();
    }

    dynamic json = jsonDecode(resp.body);
    return Authenticated.fromJson(json);
  }

  Future<AuthState> _handleRegistration(RegisterEvent event) async {
    final body = jsonEncode(
      {'email': event.email, 'password': event.password, 'name': event.name},
    );

    Response resp;
    try {
      resp = await Server.post("/auth/register", body: body);
    } catch (err) {
      print(err);
      return Unauthenticated();
    }
    if (resp.statusCode != 201) {
      return Unauthenticated();
    }

    dynamic json = jsonDecode(resp.body);
    return Authenticated.fromJson(json);
  }
}
