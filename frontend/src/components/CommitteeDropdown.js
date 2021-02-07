import React from 'react';

const committees = [
  "Administrative Regulations Review Commission (ARRC)",
  "Aging",
  "Agriculture",
  "Alcoholism and Substance Abuse",
  "Banks",
  "Budget and Revenue",
  "Children and Families",
  "Cities 1",
  "Cities 2",
  "Civil Service and Pensions",
  "Codes",
  "Commerce, Economic Development and Small Business",
  "Consumer Protection",
  "Corporations, Authorities and Commissions",
  "Crime Victims, Crime and Correction",
  "Cultural Affairs, Tourism, Parks and Recreation",
  "Disabilities",
  "Domestic Animal Welfare",
  "Education",
  "Elections",
  "Energy and Telecommunications",
  "Environmental Conservation",
  "Ethics and Internal Governance",
  "Finance",
  "Health",
  "Higher Education",
  "Housing, Construction and Community Development",
  "Insurance",
  "Internet and Technology",
  "Investigations and Government Operations",
  "Judiciary",
  "Labor",
  "Legislative Commission on Rural Resources",
  "Libraries",
  "Local Government",
  "Mental Health",
  "New York City Education",
  "Procurement and Contracts",
  "Racing, Gaming and Wagering",
  "Rules",
  "Social Services",
  "State-Native American Relations",
  "The New York State Black, Puerto Rican, Hispanic and Asian Legislative Caucus",
  "Transportation",
  "Veterans, Homeland Security and Military Affairs",
  "Women's Issues",
]

const CommitteeDropdown = ({committee, setCommittee}) => {
  return (
    <select className="search-select" value={committee} onChange={(e) => setCommittee(e.target.value)}>
      <option value="">All committees</option>
      {committees.map(c => <option key={c} value={c}>{c}</option>)}
    </select>
  )
}
export default CommitteeDropdown;
