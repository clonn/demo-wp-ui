/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies
 */
import { rgba } from 'polished';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import DisplayElement from '../../../../canvas/displayElement';
import { PAGE_WIDTH, TEXT_SET_SIZE } from '../../../../../constants';
import useBatchingCallback from '../../../../../utils/useBatchingCallback';
import useLibrary from '../../../useLibrary';

const TextSetItem = styled.button`
  border: 0;
  outline: 0;
  position: relative;
  width: ${TEXT_SET_SIZE}px;
  height: ${TEXT_SET_SIZE}px;
  background-color: ${({ theme }) => rgba(theme.colors.bg.white, 0.07)};
  border-radius: 4px;
  cursor: pointer;
`;

function TextSet({ elements }) {
  const { insertElement } = useLibrary((state) => ({
    insertElement: state.actions.insertElement,
  }));

  const insertSet = useBatchingCallback(
    (toAdd) => {
      // @todo Select all the added elements.
      // @todo Position correctly when adding.
      toAdd.forEach((e) => insertElement(e.type, e));
    },
    [insertElement]
  );

  return (
    <TextSetItem
      onClick={() => insertSet(elements)}
      aria-label={__('Insert Text Set', 'web-stories')}
    >
      {elements.map(
        ({ id, content, x, y, textSetWidth, textSetHeight, ...rest }) => (
          <DisplayElement
            previewMode
            key={id}
            element={{
              id,
              content: `<span style="color: #fff">${content}<span>`,
              x: x + (PAGE_WIDTH - textSetWidth) / 2,
              y:
                y +
                (PAGE_WIDTH - textSetHeight) /
                  2 /* Use PAGE_WIDTH here since the area is square */,
              ...rest,
            }}
          />
        )
      )}
    </TextSetItem>
  );
}

TextSet.propTypes = {
  elements: PropTypes.array.isRequired,
};

export default TextSet;
