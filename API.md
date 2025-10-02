```
Javascript

```
# GET

```
```
// API call
const response = await fetch("https://api.example.com/data");
const data = await response.json();  // JSON string → Object
console.log(data.name);

// Object → String (JSON)
const str = JSON.stringify(data);

// String → Object
const obj = JSON.parse(str);

```
```
# POST
```
```
const body = { name: "Ritesh", age: 25 };

const response = await fetch("https://api.example.com/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body) // Object → JSON string
});

const result = await response.json();
console.log(result);

```

Python

```
# GET
```

```
import requests
import json

# API call
response = requests.get("https://api.example.com/data")
data = response.json()  # JSON string → dict
print(data["name"])

# Object → String (JSON)
str_data = json.dumps(data)

# String → Object
obj = json.loads(str_data)

```

```
# POST
```
```

import requests

body = { "name": "Ritesh", "age": 25 }
response = requests.post("https://api.example.com/users", json=body)

print(response.json())


```

C#

```
# GET
```

```
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

class Program
{
    static async Task Main()
    {
        var client = new HttpClient();
        var response = await client.GetStringAsync("https://api.example.com/data");

        // String → JObject
        JObject data = JObject.Parse(response);
        Console.WriteLine(data["name"]);

        // Object → String
        string jsonStr = data.ToString();

        // String → Object
        JObject obj = JObject.Parse(jsonStr);
    }
}
```

```
# POST
```

```
using System.Net.Http;
using System.Text;
using Newtonsoft.Json.Linq;

var client = new HttpClient();
var body = new { name = "Ritesh", age = 25 };

// Object → JSON string
var json = Newtonsoft.Json.JsonConvert.SerializeObject(body);
var content = new StringContent(json, Encoding.UTF8, "application/json");

var response = await client.PostAsync("https://api.example.com/users", content);

// JSON response → JObject
var resultStr = await response.Content.ReadAsStringAsync();
JObject result = JObject.Parse(resultStr);

Console.WriteLine(result);

```


```