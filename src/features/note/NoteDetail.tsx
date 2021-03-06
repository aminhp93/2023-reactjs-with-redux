import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, notification, Spin } from 'antd';
import CustomPlate from 'components/CustomPlate';
import { v4 as uuidv4 } from 'uuid';
import { INote } from 'types/note';
import { NoteService } from 'services';

interface IProps {
  id: number;
}

const DEFAULT_NOTE = [
  {
    children: [{ text: '' }],
    type: 'p',
  },
];

const MemoizedNoteDetail = React.memo(function NoteDetail({ id }: IProps) {
  const [plateId, setPlateId] = useState(uuidv4());
  const [note, setNote] = useState(DEFAULT_NOTE);
  const [noteObj, setNoteObj] = useState({} as INote);
  const [loading, setLoading] = useState(false);

  const getStockNote = async () => {
    try {
      setLoading(true);
      const res: any = await NoteService.detailNote(id);
      setLoading(false);

      if (res.data && res.data.content) {
        setNote(JSON.parse(res.data.content));
        setNoteObj(res.data);
        setPlateId(uuidv4());
      }
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStockNote();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const data = {
        title: noteObj.title,
        content: JSON.stringify(note),
      };
      await NoteService.updateNote(id, data);
      notification.success({
        message: `Update ${noteObj.title} successfully`,
      });
    } catch (e) {
      notification.error({ message: 'Error Update Note' });
    }
  };

  const handleChange = (e: any) => {
    setNote(e);
  };

  if (loading) return <Spin />;

  return (
    <div className="Note">
      <div style={{ height: '100%' }}>
        <div style={{ height: '50px' }}>
          <Button
            type="primary"
            danger
            onClick={handleUpdate}
            style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1 }}
          >
            Update
          </Button>
        </div>
        <div style={{ flex: 1 }}>
          <CustomPlate
            id={String(plateId)}
            value={note}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
});

export default MemoizedNoteDetail;
