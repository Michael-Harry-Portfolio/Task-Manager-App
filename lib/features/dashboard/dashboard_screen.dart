import 'package:flutter/material.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return  Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(children: [
          Text('Get it done',
          style: Theme.of(context).textTheme.headlineSmall,),
           SizedBox(height:8),
           Text('Objectives',
          style: Theme.of(context).textTheme.headlineSmall,
            ),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "Today's Tasks",
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                  SizedBox(height: 8),
                  Text('Description of Task 1'),
                ],
              ),
            ),
          ),
          ],
          ),      
         ),
      ),
    );
  }
}   