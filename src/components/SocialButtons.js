import React from 'react';
import styled from 'styled-components';

const SocialIcon = styled.a`
  align-items: center;
  background-color: ${props => (props.fill ? props.fill : '#999999')};
  border: 1px solid ${props => (props.fill ? props.fill : '#999999')};
  border-radius: 4px;
  color: ${props => (props.color ? props.color : '#ffffff')};
  display: block;
  justify-content: center;
  margin: 0;
  padding: 0;
  text-decoration: none;

  svg {
    max-height: ${props => (props.height ? props.height : '48px')};
    max-width: ${props => (props.width ? props.width : '48px')};
  }
`;

const ShareIcons = {
  IconTwitter: props => {
    return (
      <SocialIcon
        fill={props.fill}
        href={
          'https://twitter.com/intent/tweet?' +
          'text=' +
          encodeURI(props.message) +
          (props.hashtags ? '&hashtags=' + props.hashtags : '') +
          (props.noVia ? '' : '&via=taxfoundation') +
          '&url=' +
          encodeURI(window.location.href)
        }
        target="_blank"
        height={props.height}
        width={props.width}
      >
        <svg id="twitter" viewBox="0 0 48 48">
          <path
            fill={props.color}
            d="M48,9.11341c-1.76603,0.78322-3.66389,1.31268-5.65607,1.55067 c2.03332-1.21873,3.5948-3.14867,4.33001-5.44828c-1.90268,1.12855-4.01024,1.94811-6.25344,2.3898 c-1.79636-1.914-4.35574-3.10992-7.18805-3.10992c-5.43885,0-9.84807,4.40923-9.84807,9.84756 c0,0.77191,0.0871,1.5234,0.25495,2.24422c-8.1844-0.41065-15.4407-4.33121-20.29778-10.28923 C2.49387,7.75272,2.0083,9.44432,2.0083,11.24909c0,3.41649,1.73858,6.43073,4.38093,8.19676 c-1.61427-0.05109-3.13272-0.49415-4.4605-1.23177c-0.00069,0.04115-0.00084,0.08231-0.00084,0.1238 c0,4.77144,3.39452,8.75168,7.8996,9.6563c-0.82642,0.22494-1.69641,0.34532-2.5945,0.34532 c-0.63458,0-1.25149-0.06173-1.8528-0.17661c1.25319,3.91234,4.89001,6.75958,9.19929,6.83914 c-3.37036,2.64116-7.61654,4.21549-12.23032,4.21549C1.55427,39.21751,0.77036,39.17088,0,39.08 c4.35814,2.79408,9.53447,4.42431,15.09573,4.42431c18.11374,0,28.0189-15.00571,28.0189-28.01916 c0-0.42694-0.00959-0.85164-0.02846-1.27394C45.01011,12.82274,46.67978,11.08826,48,9.11341z"
          />
        </svg>
        {props.text ? <span>{props.text}</span> : null}
      </SocialIcon>
    );
  },
  IconFacebook: props => {
    return (
      <SocialIcon
        fill={props.fill}
        href={
          'https://www.facebook.com/dialog/share?app_id=1667818153232107&display=page&href=' +
          encodeURI(window.location.href) +
          '&redirect_uri=' +
          encodeURI(window.location.href)
        }
        target="_blank"
        height={props.height}
        width={props.width}
      >
        <svg id="facebook" viewBox="0 0 48 48">
          <path
            fill={props.color}
            d="M18.06306,46L18,26h-8v-8h8v-5c0-7.42279,4.59664-11,11.21828-11 c3.17183,0,5.89786,0.23615,6.6923,0.3417v7.75726l-4.59246,0.00209c-3.60122,0-4.2985,1.71125-4.2985,4.22238V18H37.5l-4,8 h-6.48038v20H18.06306z"
          />
        </svg>
        {props.text ? <span>{props.text}</span> : null}
      </SocialIcon>
    );
  },
  IconLinkedIn: props => {
    return (
      <SocialIcon
        fill={props.fill}
        href={
          'https://www.linkedin.com/shareArticle?mini=true&url=' +
          encodeURI(window.location.href) +
          (props.message ? '&summary=' + encodeURI(props.message) : '')
        }
        target="_blank"
        height={props.height}
        width={props.width}
      >
        <svg id="linkedin" viewBox="0 0 48 48">
          <path
            fill={props.color}
            d="M10.74,48H1V16h9.74V48z M5.75,11.5C2.56,11.5,0,8.94,0,5.75C0,2.56,2.56,0,5.75,0
            c3.18,0,5.75,2.56,5.75,5.75C11.5,8.94,8.93,11.5,5.75,11.5z M48,48H38V32.41c0-3.72,0.1-8.41-5-8.41c-5.18,0-6,3.82-6,8v16H16.98
            V16h9.54v4.32h0.13C27.98,17.8,31.16,15,36,15c10.07,0,12,6.77,12,15.4V48z"
          />
        </svg>
        {props.text ? <span>{props.text}</span> : null}
      </SocialIcon>
    );
  },
  IconEmail: props => {
    return (
      <SocialIcon
        fill={props.fill}
        href={`mailto:?subject=${props.emailSubject}&body=${props.emailBody}`}
        height={props.height}
        width={props.width}
      >
        <svg id="email" viewBox="0 0 64 64">
          <path
            fill={props.color}
            d="M3.5,25l12.1,8.8l16.8-9.1c0.5-0.3,1,0.4,0.6,0.8L19,37v19.4c0,0.9,1.1,1.4,1.7,0.7L31,45.5L49.5,59c0.6,0.4,1.4,0.1,1.6-0.6l10-54c0.1-0.8-0.6-1.4-1.3-1.1l-56,20C3,23.6,2.9,24.6,3.5,25z"
          />
        </svg>
        {props.text ? <span>{props.text}</span> : null}
      </SocialIcon>
    );
  },
};

const Container = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template: 30px / repeat(4, 30px);
  justify-content: center;
  padding: 0;
  margin-bottom: 1rem;
`;

const SocialButtons = props => {
  return (
    <Container>
      {ShareIcons.IconTwitter({
        color: '#00b6f1',
        fill: '#fff',
        height: props.size,
        width: props.size,
        message: props.message,
        hashtags: props.hashtags,
      })}
      {ShareIcons.IconFacebook({
        color: '#3b5998',
        fill: '#fff',
        height: props.size,
        width: props.size,
      })}
      {ShareIcons.IconLinkedIn({
        color: '#007bb6',
        fill: '#fff',
        height: props.size,
        width: props.size,
        message: props.message,
      })}
      {ShareIcons.IconEmail({
        color: '#df4a32',
        fill: '#fff',
        height: props.size,
        width: props.size,
        emailSubject: props.emailSubject,
        emailBody: props.emailBody,
      })}
    </Container>
  );
};

export default SocialButtons;
