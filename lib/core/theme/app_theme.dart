import 'package:flutter/material.dart';
class AppTheme {
  static ThemeData get lightTheme {
    return ThemeData(
      colorScheme: ColorScheme.fromSeed(
        seedColor: Color(0xFF0A714E),
    ),
      useMaterial3: true,
      scaffoldBackgroundColor: Color(0xFFF4F8F5),
     textTheme: const TextTheme(
  headlineSmall: TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.bold,
  ),
),

    );
  }
}