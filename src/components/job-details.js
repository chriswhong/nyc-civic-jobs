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
import './styles.css';


library.add(faMoneyBillWave, faClock, faTags, faMapMarkerAlt);

const formatCurrency = number => numeral(number).format('($0a)');

const JobDetails = ({
  job_category_ids: jobCategoryIds,
  posting_date: postingDate,
  salary_range_from: salaryRangeFrom,
  salary_range_to: salaryRangeTo,
  salary_frequency: salaryFrequency,
  work_location: workLocation,
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
          {formatCurrency(salaryRangeFrom)}
          {' '}
          -
          {' '}
          {formatCurrency(salaryRangeTo)}
          {' '}
          (
          {salaryFrequency}
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
