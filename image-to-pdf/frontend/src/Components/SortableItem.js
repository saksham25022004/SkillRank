import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

const SortableItem = ({ file, index, removeImage }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: index });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: "100px",
    height: "100px",
    margin: "10px",
    position: "relative",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <img
        src={URL.createObjectURL(file)}
        alt={`Preview ${index}`}
        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "5px" }}
      />
      <button
        onClick={() => removeImage(index)}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          backgroundColor: "red",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        X
      </button>
    </div>
  );
};

export default SortableItem;