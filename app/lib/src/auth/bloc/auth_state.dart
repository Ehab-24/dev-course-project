part of 'auth_bloc.dart';

@immutable
sealed class AuthState {}

final class Unauthenticated extends AuthState {
  Unauthenticated() {
    print("Logout");
  }
}

final class Authenticated extends AuthState {
  final User user;
  final String accessToken;

  Authenticated({
    required this.user,
    required this.accessToken,
  });

  factory Authenticated.fromJson(Map<String, dynamic> json) {
    return Authenticated(
      user: User.fromJson(json['user']),
      accessToken: json['access_token'],
    );
  }
}
