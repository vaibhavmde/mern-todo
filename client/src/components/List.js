import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./list.css";

export default function List({ text, remove, update }) {
  return (
    <div className="con">
      <div className="group">
        <div className="text">{text}</div>
        <div className="icon">
          <EditIcon color="warning" onClick={update} />
          <DeleteIcon color="error" onClick={remove} />
        </div>
      </div>
    </div>
  );
}
