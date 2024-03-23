# API Endpoints

```
Programming
└───Algorithms
│   └───Graph
│       │  🔗 A*
│       │  🔗 BFS
│
└───Database
|   │   🔗 Storing Hierarchical Data
|   │   🔗 B-trees
|
Math
└───Calculus
|   └───Multivariable
|       |  🔗 Gradient
```

```
| id       | parent_id | title         |
|----------|-----------|---------------|
| 1        | NULL      | Programming   |
| 2        | 1         | Algorithms    |
| 3        | 2         | Graph         |
| 4        | 1         | Database      |
| 5        | NULL      | Math          |
| 6        | 5         | Calculus      |
| 7        | 6         | Multivariable |
```

### Categories

- **Get anchestor subtree**
  - **input:** Multivariable **output:** [Multivariable, Calculus, Math]
  - **input:** {parent_id: 5, title: Linear Algebra}

### Links

- **Get by id**
  - **input:** 1 **output:** {id: 1, title: A\*, url: "https://", categorie_id: 3}
- **Get all links that belong to a certain category**
  - **input:** 4 **output:** [{id: 3, title: Storing Hierarchical Data, url: http://, categorie_id: 4}, {id: 4, title: B-trees, url: http://, categorie_id: 4}]
- **Delete by id**
- **Create link inside a categorie**
  - **input:** {title: "Chain Rule", url: "http://", categorie_id: 6}
