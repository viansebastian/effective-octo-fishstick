import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Traffic Optimizer',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.green),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'Trafiic Optimizer Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  Future<void> _openLinkPopup() async {
    String linkInput = '';
    Map<String, dynamic>? responseMessage;

    await showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Enter Link'),
          content: Column(
            children: [
              TextField(
                onChanged: (value) {
                  linkInput = value;
                },
                decoration: const InputDecoration(hintText: 'Enter link here'),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: () async {
                  print('Link entered: $linkInput');

                  // Send the link to localhost:5000/traffic-url
                  final response = await sendLinkToServer(linkInput);
                  if (response != null) {
                    // Convert the JSON string to a Map
                    responseMessage = json.decode(response);
                  } else {
                    responseMessage = {'error': 'Failed to get response.'};
                  }

                  Navigator.of(context).pop();
                },
                child: const Text('OK'),
              ),
            ],
          ),
        );
      },
    );

    if (responseMessage != null) {
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: const Text('Response'),
            content: Column(
              children: responseMessage!.entries.map((entry) {
                return ListTile(
                  title: Text('${entry.key}: ${entry.value}'),
                );
              }).toList(),
            ),
            actions: <Widget>[
              TextButton(
                onPressed: () {
                  Navigator.of(context).pop();
                },
                child: const Text('OK'),
              ),
            ],
          );
        },
      );
    }
  }

  Future<String?> sendLinkToServer(String link) async {
    // print(link);
    final response = await http.post(
      Uri.parse('http://localhost:5000/traffic-url'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'imageLink': link}),
    );
    // print(link);

    if (response.statusCode == 200) {
      print('Link sent successfully');
      return response.body;
    } else {
      print('Failed to send link. Status code: ${response.statusCode}');
      return null;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              ElevatedButton(
                onPressed: () {
                  _openLinkPopup();
                },
                child: const Text('Enter Traffic Image Here'),
              )
            ]),
      ),
    );
  }
}
