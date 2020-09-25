import React, { useContext, useState, useMemo, createContext } from "react";
import { useMutation, gql } from "@apollo/client";
import { useParams } from "react-router-dom";

const UPDATE_IMAGES_ORDER_MUTATION = gql`
  mutation UpdateImagesOrder($images: [ImagesInput]!, $uuid: String!) {
    updateImagesOrder(images: $images, uuid: $uuid)
  }
`;

function move(array, oldIndex, newIndex) {
  if (newIndex >= array.length) {
    newIndex = array.length - 1;
  }
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
  return array;
}

function moveElement(array, index, offset) {
  const newIndex = index + offset;
  return move(array.slice(), index, newIndex);
}

const ImagesGridContext = createContext({ items: [] });

const useImagesGrid = () => useContext(ImagesGridContext);

function ImagesGridProvider({ children, initialItems }) {
  const { propertyId } = useParams();
  const [updateImagesOrder, { loading, error }] = useMutation(
    UPDATE_IMAGES_ORDER_MUTATION
  );

  const [items, setItems] = useState(initialItems);

  const moveItem = (sourceId, destinationId) => {
    const sourceIndex = items.findIndex((item) => item.id === sourceId);
    const destinationIndex = items.findIndex(
      (item) => item.id === destinationId
    );

    if (sourceId === -1 || destinationId === -1) {
      return;
    }

    const offset = destinationIndex - sourceIndex;

    const newItems = moveElement(items, sourceIndex, offset);
    setItems(newItems);

    let itemsToUpdate = [];
    newItems.forEach((item, i) => {
      if (i + 1 !== item.order) {
        itemsToUpdate.push({ ...item, order: i + 1 });
      }
    });

    updateImagesOrder({
      variables: {
        images: itemsToUpdate.map((i) => ({ id: i.id, order: i.order })),
        uuid: propertyId,
      },
    });
  };

  const value = useMemo(() => ({ items, setItems, moveItem }), [
    items,
    setItems,
    moveItem,
  ]);

  return (
    <ImagesGridContext.Provider value={value}>
      {children}
    </ImagesGridContext.Provider>
  );
}

export { useImagesGrid, ImagesGridProvider };
