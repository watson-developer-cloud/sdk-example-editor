import React, { useCallback } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Dropdown, Link } from 'carbon-components-react';
import File from './File';

import { selectFile, clearFiles } from '../redux/ducks';

import './FileList.scss';

export default function FileList() {
  const dispatch = useDispatch();

  const { allIds, selectedId } = useSelector(
    (state) => ({
      allIds: state.allIds,
      selectedId: state.selectedId,
    }),
    shallowEqual
  );

  const onClearClick = useCallback(() => {
    dispatch(clearFiles());
  }, [dispatch]);

  const handleFileSelection = useCallback(
    ({ selectedItem }) => {
      dispatch(selectFile(selectedItem));
    },
    [dispatch]
  );

  if (allIds.length === 0) {
    return null;
  }

  return (
    <section className="file-list">
      <div className="file-list__selector">
        <Dropdown
          ariaLabel="API Definitions"
          direction="bottom"
          helperText="Swagger File Selection"
          id="swagger-dropdown"
          invalidText="A valid value is required"
          items={allIds}
          label="API Selection"
          selectedItem={selectedId}
          onChange={handleFileSelection}
          type="default"
        />
      </div>
      <div className="file-list__clear">
        <Link href="#" onClick={onClearClick}>
          Clear
        </Link>
      </div>
      <div className="file-list__file">{selectedId && <File />}</div>
    </section>
  );
}
