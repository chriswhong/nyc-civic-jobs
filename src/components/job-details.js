import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMoneyBillWave,
  faClock,
  faTags,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';

import { LookupCategoryDisplayName } from '../../utils/process-categories';
import './expand-collapse.css';

library.add(faMoneyBillWave, faClock, faTags, faMapMarkerAlt);

const formatCurrency = number => numeral(number).format('($0a)');

const JobDetails = ({
  jobCategoryIds,
  postingDate,
  salaryLow,
  salaryHigh,
  salaryType,
  workLocation,
}) => {
  const dateString = moment(postingDate).fromNow();


  const jobCategories = jobCategoryIds.map((id) => {
    const displayName = LookupCategoryDisplayName(id);
    return (
      <small key={id}><a href={`/category/${id}`}><span className="badge badge-secondary">{displayName}</span></a></small>
    );
  });

  return (
    <ul>
      <li>
        <FontAwesomeIcon icon="clock" />
        <small>{dateString}</small>
      </li>
      <li>
        <FontAwesomeIcon icon="money-bill-wave" />
        <small>
          {formatCurrency(salaryLow)}
          {' '}
          -
          {' '}
          {formatCurrency(salaryHigh)}
          {' '}
          (
          {salaryType}
          )
        </small>
      </li>
      { workLocation !== 'Not Used' && (
        <li>
          <FontAwesomeIcon icon="map-marker-alt" />
          <small>
            <a href={`https://www.google.com/maps/search/?api=1&query=${workLocation}`} target="_blank" rel="noopener noreferrer">
              {workLocation}
            </a>
          </small>
        </li>
      )
      }
      <li>
        <FontAwesomeIcon icon="tags" />
        {jobCategories}
      </li>
    </ul>
  );
};

export default JobDetails;
