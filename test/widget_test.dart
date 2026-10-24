// This is a basic Flutter widget test.
//
// To perform an interaction with a widget in your test, use the WidgetTester
// utility in the flutter_test package. For example, you can send tap and scroll
// gestures. You can also use WidgetTester to find child widgets in the widget
// tree, read text, and verify that the values of widget properties are correct.

import 'package:flutter_test/flutter_test.dart';
import 'package:task_manager_app/app.dart';


void main() {
  testWidgets('Task Manager app displays its title', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const TaskManagerApp());
   

    // Verify that our counter has incremented.
   expect(find.text('Task Manager'), findsOneWidget);
  });
}
