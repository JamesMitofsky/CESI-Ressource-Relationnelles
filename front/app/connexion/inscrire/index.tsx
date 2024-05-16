import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
// import axios from 'axios';
import { Resource } from "../../../types/resource";
import { Text } from "@gluestack-ui/themed";

// scratchpad for signup page page and type

export default function App() {
  const [resources, setResources] = useState<Resource[]>([]);

  // useEffect(() => {
  //   const fetchResources = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3000/api/resources');
  //       setResources(response.data);
  //     } catch (error) {
  //       console.error('Error fetching resources:', error);
  //     }
  //   };

  //   fetchResources();
  // }, []);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        // Replace axios request with dummy data
        const dummyData: Resource[] = [
          {
            _id: "1",
            title: "Resource 1",
            type: "Type 1",
            categories: [{ categoryType: "Image" }],
            uploader: "User1",
            comments: [
              {
                _id: "Comment1",
                creationDate: new Date(),
                content: "This is a comment",
                commenter: "User2",
              },
            ],
            isArchived: false,
            isFavorite: false,
          },
          {
            _id: "1",
            title: "Resource 1",
            type: "Type 1",
            categories: [{ categoryType: "Image" }],
            uploader: "User1",
            comments: [
              {
                _id: "Comment1",
                creationDate: new Date(),
                content: "This is a comment",
                commenter: "User2",
              },
            ],
            isArchived: false,
            isFavorite: false,
          },
          {
            _id: "1",
            title: "Resource 1",
            type: "Type 1",
            categories: [{ categoryType: "Image" }],
            uploader: "User1",
            comments: [
              {
                _id: "Comment1",
                creationDate: new Date(),
                content: "This is a comment",
                commenter: "User2",
              },
            ],
            isArchived: false,
            isFavorite: false,
          },
        ];
        setResources(dummyData);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };

    fetchResources();
  }, []);

  return (
    <ScrollView>
      <Text size="6xl">Sign up page</Text>
    </ScrollView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  type: {
    fontSize: 16,
    marginTop: 8,
  },
  categories: {
    fontSize: 14,
    marginTop: 8,
    color: "#666",
  },
  uploader: {
    fontSize: 14,
    marginTop: 8,
    color: "#666",
  },
  status: {
    fontSize: 14,
    marginTop: 8,
    color: "#666",
  },
});
