import 'package:app2/src/auth/bloc/auth_bloc.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class RegisterPage extends StatefulWidget {
  const RegisterPage({super.key});

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  String name = "";
  String email = "";
  String password = "";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Padding(
        padding: const EdgeInsets.symmetric(vertical: 40.0, horizontal: 16),
        child: Column(
          children: [
            TextField(
              decoration: const InputDecoration(labelText: "Name"),
              onChanged: (value) => setState(() {
                name = value;
              }),
            ),
            const SizedBox(height: 24),
            TextField(
              decoration: const InputDecoration(labelText: "Email"),
              onChanged: (value) => setState(() {
                email = value;
              }),
            ),
            const SizedBox(height: 24),
            TextField(
              obscureText: true,
              decoration: const InputDecoration(labelText: "Password"),
              onChanged: (value) => setState(() {
                password = value;
              }),
            ),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: () {
                BlocProvider.of<AuthBloc>(context).add(
                  RegisterEvent(
                    name: name,
                    email: email,
                    password: password,
                  ),
                );
              },
              child: const Text("Register"),
            ),
          ],
        ),
      ),
    );
  }
}
