'use client';

import DOMPurify from 'dompurify';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import { useTranslation } from 'react-i18next';

import Container from '@/components/Container';
import Section from '@/components/sections/Section';
import Swiper from '@/components/Swiper';
import { Button } from '@/components/ui/button';
import { Team, TeamMember, TeamSection as TeamSectionType } from '@/types';
import useResponsiveImage from '@/hooks/useResponsiveImage';

type TeamFilterItemProps = {
  team: Team;
  isSelected: boolean;
  onTeamSelect: (team: Team) => void;
};

function TeamFilterItem({
  team,
  isSelected,
  onTeamSelect,
}: TeamFilterItemProps) {
  const onTeamClick = () => {
    onTeamSelect(team);
  };

  return (
    <li key={team.id} onClick={onTeamClick}>
      <Button variant={isSelected ? 'primary' : 'secondary'}>
        {team.name}
      </Button>
    </li>
  );
}

type TeamFiltersProps = {
  teams: Team[];
  selectedTeam: Team | null;
  onTeamSelect: (team: Team) => void;
};

function TeamFilters({ teams, selectedTeam, onTeamSelect }: TeamFiltersProps) {
  const { t } = useTranslation(['common']);

  return (
    <div className="flex flex-col gap-6 rounded-lg bg-gray-100 px-4 py-[14px] lg:flex-row lg:items-center lg:gap-[35px] lg:px-9">
      <h4 className="typo-base-semibold pt-4 uppercase text-gray-900 lg:pt-0">
        {t('common.filter')}
      </h4>
      <ul className="flex flex-wrap gap-x-2 gap-y-4 lg:gap-6">
        {teams.map(team => (
          <TeamFilterItem
            key={team.id}
            team={team}
            isSelected={selectedTeam ? selectedTeam.id === team.id : false}
            onTeamSelect={onTeamSelect}
          />
        ))}
      </ul>
    </div>
  );
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  const imageUrl = useResponsiveImage(member.avatar);
  return (
    <div className="flex flex-col gap-6">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <ImageWithFallback
          src={imageUrl}
          alt={member.name}
          width={0}
          height={0}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{ width: 'auto', height: '100%' }}
          className="object-cover object-center"
        />
      </div>
      <div className="h-full">
        <h4 className="typo-2xl-bold text-gray-900">{member.name}</h4>
        <p className="typo-lg-regular mt-1 text-secondary-500">
          {member.position}
        </p>
        <p
          className="typo-sm-regular mt-4 text-gray-900"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(member.bio) }}
        />
      </div>
    </div>
  );
}

function CarouselTeamMembers({ members }: { members: TeamMember[] }) {
  return (
    <Swiper
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        1024: {
          slidesPerView: 4,
        },
      }}
      slidesPerView={4}
      spaceBetween={32}>
      {members.map(member => (
        <SwiperSlide key={member.id}>
          <TeamMemberCard member={member} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

const extractUniqueTeams = (members: TeamMember[]): Team[] => {
  return [
    ...new Map(
      members.flatMap(member => member.teams).map(team => [team.id, team]),
    ).values(),
  ];
};

const filterMembersByTeam = (
  members: TeamMember[],
  selectedTeam: Team | null,
): TeamMember[] => {
  return members.filter(member =>
    selectedTeam
      ? member.teams.some(team => team.id === selectedTeam.id)
      : true,
  );
};

type TeamSectionProps = {
  lang: string;
  section: TeamSectionType;
};

function TeamSection({ section }: TeamSectionProps) {
  const teams = extractUniqueTeams(section.members);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(teams[0]);
  const filteredMembers = filterMembersByTeam(section.members, selectedTeam);

  return (
    <Section>
      <Container className="flex flex-col gap-7">
        <TeamFilters
          teams={teams}
          selectedTeam={selectedTeam}
          onTeamSelect={setSelectedTeam}
        />
        <CarouselTeamMembers members={filteredMembers} />
      </Container>
    </Section>
  );
}

export default TeamSection;
