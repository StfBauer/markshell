# Markshell Complete Demo

This file demonstrates all supported Markdown formatting and syntax highlighting features.

## Text Formatting

This is **bold text** and this is *italic text*. You can combine them: **_bold italic_**.

You can also use ~~strikethrough~~ text.

Here's some `inline code` within text.

## Headings

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

## Links

Check out [Markshell on GitHub](https://github.com/n8design/markshell) for more information.

## Block Quotes

> This is a blockquote.
> It can span multiple lines.
>
> And include multiple paragraphs.

## Lists

### Unordered List
- First item
- Second item
  - Nested item
  - Another nested item
- Third item

### Ordered List
1. First step
2. Second step
3. Third step

## Definition Lists

Term 1
: Definition of term 1

Term 2
: Definition of term 2
: Alternative definition

## Horizontal Rule

---

## Code Blocks - Popular Languages

### JavaScript / Node.js

```javascript
// ES6+ JavaScript
const greeting = (name) => `Hello, ${name}!`;

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    async fetchData() {
        const response = await fetch('/api/data');
        return response.json();
    }
}

// Array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled);
```

### TypeScript

```typescript
// TypeScript with types
interface User {
    id: number;
    name: string;
    email?: string;
}

class UserService {
    private users: User[] = [];

    addUser(user: User): void {
        this.users.push(user);
    }

    findById(id: number): User | undefined {
        return this.users.find(u => u.id === id);
    }
}

// Generic function
function identity<T>(arg: T): T {
    return arg;
}
```

### Python

```python
# Python 3 example
import asyncio
from typing import List, Optional

class DataProcessor:
    def __init__(self, name: str):
        self.name = name
        self.data: List[int] = []

    async def process(self, items: List[int]) -> Optional[int]:
        """Process items and return sum"""
        self.data.extend(items)
        await asyncio.sleep(0.1)
        return sum(self.data) if self.data else None

# List comprehension
squares = [x**2 for x in range(10) if x % 2 == 0]

# Decorator
@staticmethod
def calculate(a: int, b: int) -> int:
    return a + b
```

### Bash / Shell

```bash
#!/bin/bash
# Shell script example

# Variables
NAME="World"
echo "Hello, $NAME!"

# Functions
function deploy() {
    local env=$1
    echo "Deploying to $env environment..."

    if [ "$env" == "production" ]; then
        echo "Running production checks..."
    fi
}

# Arrays
servers=("web1" "web2" "db1")
for server in "${servers[@]}"; do
    ssh "$server" 'uptime'
done

# Command substitution
current_date=$(date +%Y-%m-%d)
echo "Today is $current_date"
```

### Go

```go
// Go example
package main

import (
    "fmt"
    "net/http"
)

type Server struct {
    Port int
    Name string
}

func (s *Server) Start() error {
    handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello from %s!", s.Name)
    })

    addr := fmt.Sprintf(":%d", s.Port)
    return http.ListenAndServe(addr, handler)
}

func main() {
    server := &Server{Port: 8080, Name: "MyServer"}
    if err := server.Start(); err != nil {
        panic(err)
    }
}
```

### Rust

```rust
// Rust example
use std::collections::HashMap;

#[derive(Debug, Clone)]
struct User {
    id: u32,
    name: String,
    email: Option<String>,
}

impl User {
    fn new(id: u32, name: String) -> Self {
        User {
            id,
            name,
            email: None,
        }
    }
}

fn process_users(users: Vec<User>) -> HashMap<u32, String> {
    users.into_iter()
        .map(|u| (u.id, u.name))
        .collect()
}

fn main() {
    let user = User::new(1, String::from("Alice"));
    println!("{:?}", user);
}
```

### Java

```java
// Java example
import java.util.*;
import java.util.stream.*;

public class Application {
    private final String name;
    private List<User> users;

    public Application(String name) {
        this.name = name;
        this.users = new ArrayList<>();
    }

    public List<User> getActiveUsers() {
        return users.stream()
            .filter(User::isActive)
            .collect(Collectors.toList());
    }

    public static void main(String[] args) {
        Application app = new Application("MyApp");
        System.out.println("Starting " + app.name);
    }
}

class User {
    private String name;
    private boolean active;

    public boolean isActive() {
        return active;
    }
}
```

### C#

```csharp
// C# example
using System;
using System.Linq;
using System.Collections.Generic;

namespace MyApp
{
    public class UserService
    {
        private readonly List<User> _users;

        public UserService()
        {
            _users = new List<User>();
        }

        public async Task<User> GetUserAsync(int id)
        {
            await Task.Delay(100);
            return _users.FirstOrDefault(u => u.Id == id);
        }
    }

    public record User(int Id, string Name, string Email);

    class Program
    {
        static async Task Main(string[] args)
        {
            var service = new UserService();
            var user = await service.GetUserAsync(1);
            Console.WriteLine($"User: {user?.Name}");
        }
    }
}
```

### C++

```cpp
// C++ example
#include <iostream>
#include <vector>
#include <memory>
#include <algorithm>

template<typename T>
class Container {
private:
    std::vector<T> data;

public:
    void add(const T& item) {
        data.push_back(item);
    }

    size_t size() const {
        return data.size();
    }

    void sort() {
        std::sort(data.begin(), data.end());
    }
};

int main() {
    auto container = std::make_unique<Container<int>>();
    container->add(42);
    container->add(17);

    std::cout << "Size: " << container->size() << std::endl;
    return 0;
}
```

### Ruby

```ruby
# Ruby example
class User
  attr_accessor :name, :email

  def initialize(name, email = nil)
    @name = name
    @email = email
  end

  def greet
    "Hello, I'm #{@name}!"
  end
end

# Module
module Authenticatable
  def authenticate(password)
    # Authentication logic
    password == "secret"
  end
end

# Array methods
numbers = [1, 2, 3, 4, 5]
doubled = numbers.map { |n| n * 2 }
filtered = numbers.select(&:even?)

# Symbol to proc
names = users.map(&:name)
```

### PHP

```php
<?php
// PHP example
namespace App\Services;

class UserService
{
    private array $users = [];

    public function __construct(
        private DatabaseConnection $db
    ) {}

    public function findById(int $id): ?User
    {
        return $this->users[$id] ?? null;
    }

    public function create(array $data): User
    {
        $user = new User(
            name: $data['name'],
            email: $data['email']
        );

        $this->users[] = $user;
        return $user;
    }
}

// Arrow function
$multiply = fn($a, $b) => $a * $b;
echo $multiply(5, 3);
?>
```

### Swift

```swift
// Swift example
import Foundation

protocol Identifiable {
    var id: UUID { get }
}

struct User: Identifiable {
    let id: UUID
    var name: String
    var email: String?

    init(name: String, email: String? = nil) {
        self.id = UUID()
        self.name = name
        self.email = email
    }
}

class UserService {
    private var users: [User] = []

    func addUser(_ user: User) {
        users.append(user)
    }

    func findUser(by id: UUID) -> User? {
        users.first { $0.id == id }
    }
}

// Closure
let doubled = [1, 2, 3].map { $0 * 2 }
```

### Kotlin

```kotlin
// Kotlin example
data class User(
    val id: Int,
    val name: String,
    val email: String? = null
)

class UserRepository {
    private val users = mutableListOf<User>()

    fun addUser(user: User) {
        users.add(user)
    }

    fun findById(id: Int): User? {
        return users.find { it.id == id }
    }

    suspend fun fetchFromApi(): List<User> {
        // Coroutine example
        delay(100)
        return emptyList()
    }
}

fun main() {
    val user = User(1, "Alice", "alice@example.com")
    println("User: ${user.name}")
}
```

### Scala

```scala
// Scala example
case class User(id: Int, name: String, email: Option[String] = None)

trait Repository[T] {
  def findById(id: Int): Option[T]
  def save(entity: T): Unit
}

class UserRepository extends Repository[User] {
  private var users: List[User] = List()

  override def findById(id: Int): Option[User] = {
    users.find(_.id == id)
  }

  override def save(user: User): Unit = {
    users = user :: users
  }
}

// Pattern matching
def describe(x: Any): String = x match {
  case i: Int if i > 0 => "positive integer"
  case s: String => s"string: $s"
  case _ => "something else"
}
```

### Elixir

```elixir
# Elixir example
defmodule User do
  defstruct [:id, :name, :email]

  def new(name, email \\ nil) do
    %User{
      id: :rand.uniform(10000),
      name: name,
      email: email
    }
  end

  def greet(%User{name: name}) do
    "Hello, #{name}!"
  end
end

defmodule UserService do
  def process_users(users) do
    users
    |> Enum.filter(&active?/1)
    |> Enum.map(&transform/1)
  end

  defp active?(%User{email: email}) when not is_nil(email), do: true
  defp active?(_), do: false
end

# Pattern matching
case User.new("Alice") do
  %User{name: name} -> IO.puts("Created: #{name}")
  _ -> IO.puts("Failed")
end
```

### Haskell

```haskell
-- Haskell example
module User where

import Data.Maybe (fromMaybe)

data User = User
  { userId :: Int
  , userName :: String
  , userEmail :: Maybe String
  } deriving (Show, Eq)

-- Type class
class Identifiable a where
  getId :: a -> Int

instance Identifiable User where
  getId = userId

-- Higher-order function
processUsers :: [User] -> [String]
processUsers = map userName . filter hasEmail
  where
    hasEmail user = case userEmail user of
      Just _ -> True
      Nothing -> False

-- Function composition
greet :: User -> String
greet = ("Hello, " ++) . userName
```

### SQL

```sql
-- SQL example
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);

-- Insert data
INSERT INTO users (name, email)
VALUES
    ('Alice', 'alice@example.com'),
    ('Bob', 'bob@example.com');

-- Complex query with JOIN
SELECT
    u.name,
    u.email,
    COUNT(o.id) as order_count,
    SUM(o.total) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at > '2024-01-01'
GROUP BY u.id, u.name, u.email
HAVING COUNT(o.id) > 0
ORDER BY total_spent DESC
LIMIT 10;

-- Update with subquery
UPDATE users
SET updated_at = CURRENT_TIMESTAMP
WHERE id IN (
    SELECT user_id
    FROM orders
    WHERE created_at > NOW() - INTERVAL '7 days'
);
```

### JSON

```json
{
  "name": "markshell",
  "version": "1.7.0",
  "description": "Markdown renderer for terminal",
  "main": "lib/index.js",
  "scripts": {
    "test": "vitest",
    "start": "node bin/markshell.js"
  },
  "dependencies": {
    "chalk": "^4.1.2",
    "prismjs": "^1.30.0"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/n8design/markshell"
  },
  "keywords": [
    "markdown",
    "terminal",
    "cli",
    "syntax-highlighting"
  ],
  "author": "n8design",
  "license": "MIT"
}
```

### YAML

```yaml
# YAML configuration
name: CI/CD Pipeline
on:
  push:
    branches:
      - main
      - develop
  pull_request:
    types: [opened, synchronize]

env:
  NODE_VERSION: '18'
  CACHE_KEY: v1

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy
        run: echo "Deploying..."
```

### TOML

```toml
# TOML configuration
[package]
name = "my-app"
version = "1.0.0"
authors = ["developer@example.com"]
edition = "2021"

[dependencies]
tokio = { version = "1.0", features = ["full"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"

[dev-dependencies]
criterion = "0.5"

[profile.release]
opt-level = 3
lto = true
codegen-units = 1
```

### XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <appSettings>
        <add key="Environment" value="Production" />
        <add key="LogLevel" value="Info" />
    </appSettings>

    <connectionStrings>
        <add name="DefaultConnection"
             connectionString="Server=localhost;Database=mydb;User=admin;"
             providerName="System.Data.SqlClient" />
    </connectionStrings>

    <system.web>
        <compilation debug="false" targetFramework="4.8" />
        <httpRuntime maxRequestLength="10240" />
    </system.web>
</configuration>
```

### HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
    </style>
</head>
<body>
    <header>
        <h1>Welcome</h1>
        <nav>
            <a href="#home">Home</a>
            <a href="#about">About</a>
        </nav>
    </header>

    <main>
        <section id="content">
            <p>Hello, <strong>world</strong>!</p>
        </section>
    </main>

    <script>
        console.log('Page loaded');
    </script>
</body>
</html>
```

### CSS

```css
/* CSS example */
:root {
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --font-stack: 'Helvetica Neue', sans-serif;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.button {
    display: inline-block;
    padding: 10px 20px;
    background: var(--primary-color);
    color: white;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.button:hover {
    background: var(--secondary-color);
    transform: translateY(-2px);
}

@media (max-width: 768px) {
    .container {
        padding: 10px;
    }
}
```

### Docker

```dockerfile
# Dockerfile example
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/index.js"]
```

### Regex

```regex
# Email validation
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$

# URL matching
https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)

# Phone number (US)
^\+?1?\s*\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$

# IPv4 address
^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$
```

### Git Config

```gitconfig
# Git configuration
[user]
    name = Developer
    email = dev@example.com

[core]
    editor = vim
    autocrlf = input
    excludesfile = ~/.gitignore_global

[alias]
    st = status
    co = checkout
    br = branch
    ci = commit
    unstage = reset HEAD --
    last = log -1 HEAD

[color]
    ui = auto

[push]
    default = current
```

### Diff

```diff
diff --git a/lib/index.js b/lib/index.js
index abcd123..efgh456 100644
--- a/lib/index.js
+++ b/lib/index.js
@@ -10,7 +10,8 @@
 const syntaxHighlighter = require('./syntaxhighlighter');

-const version = '1.6.0';
+const version = '1.7.0';
+const features = ['dynamic-loading', 'syntax-highlighting'];

 module.exports = {
-    version
+    version,
+    features
 };
```

---

## Summary

This document demonstrates:
- ✅ All text formatting (bold, italic, strikethrough, inline code)
- ✅ All heading levels (H1-H6)
- ✅ Links and references
- ✅ Block quotes
- ✅ Ordered and unordered lists
- ✅ Definition lists
- ✅ Horizontal rules
- ✅ Syntax highlighting for 30+ languages
- ✅ Configuration formats (JSON, YAML, TOML, XML)
- ✅ Web technologies (HTML, CSS)
- ✅ DevOps (Docker, Git, Diff)

**View this file with:**
```bash
markshell DEMO.md
# or with color support
FORCE_COLOR=1 markshell DEMO.md
```
